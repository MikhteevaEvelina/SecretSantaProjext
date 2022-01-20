const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');
const fileSys = require('fs');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Hobby, UsrHobby, UsrPair} = require('../models/models')
const Op = require("sequelize/lib/operators");

class UserController{

    async registration(req, res, next) {
        const {email, password, role} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или пароль'))
        }
        const userOld = await User.findOne({where:{email}})
        if (userOld) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, password: hashPassword, role})
        const token = UserController.generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    static generateJwt(id, email, role) {
        return jwt.sign(
            {id, email, role},
            process.env.SECRET_KEY,
            {expiresIn: '24h'}
        )
    }

    async login(req, res, next) {
        const {email, password} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или пароль'))
        }

        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь с таким email не найден'))
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return next(ApiError.internal('Неверный пароль'))
        }
        const token = UserController.generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = UserController.generateJwt(req.user.id, req.user.email, req.user.role)
        res.json({token})
    }

    async update(req, res, next) {
        try {
            const id = req.params.id
            let {name, sex, age, post_adr, fileName, hobby} = req.body

            const user = await User.findByPk(id)
            if (user) {
                if (!fileName || fileName !== user.img) {
                    if (req.files) {
                        const {img} = req.files
                        fileName = uuid.v4() + ".jpg"
                        await img.mv(path.resolve(__dirname, '..', 'static', fileName))
                        if (user.img && fileSys.existsSync(path.resolve(__dirname, '..', 'static', user.img))) {
                            fileSys.unlinkSync(path.resolve(__dirname, '..', 'static', user.img))
                        }
                    } else {
                        fileName = user.img
                    }
                }
                await user.update({name, sex, age, post_adr, img: fileName})
                if (hobby) {
                    hobby = JSON.parse(hobby)
                    await UsrHobby.destroy({where:{userId: id}})

                    for await (const i of hobby) {
                        try {
                            const hobbyOld = await Hobby.findOne({where: {name: i.name}})
                            if (hobbyOld) {
                                await UsrHobby.create({userId: id, hobbyId: hobbyOld.id})
                            } else {
                                const hobbyNew = await Hobby.create({name: i.name})
                                await UsrHobby.create({userId: id, hobbyId: hobbyNew.id})
                            }
                        } catch (e) {
                            next(ApiError.badRequest(e.message))
                        }
                    }
                    return await UserController.getUserDeep(id, res, next)
                } else {
                    return res.json(user)
                }
            } else {
                next(ApiError.badRequest(`Пользователь с id = ${id} не найден`))
            }
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    static async getUserDeep(id, res, next) {
        try {
            const user = await User.findByPk(id, {
                include: [{
                    model: UsrHobby,
                    as: 'userHobby',
                    required: false,
                    include: [{
                        model: Hobby,
                        as: 'hobby',
                        required: false
                    }]
                }]
            })

            if (user) {
                return res.json(user)
            } else {
                next(ApiError.badRequest(`Пользователь с id = ${id} не найден`))
            }
        }
        catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async deleteOne(req, res, next) {

        const id = req.params.id

        try {
            const user = await User.findByPk(id)
            if (user) {
                try {
                    await UsrHobby.destroy({where:{userId: user.id}})
                    await UsrPair.destroy({where:{santa_id: user.id}})
                    await UsrPair.destroy({where:{rec_id: user.id}})
                    await User.destroy({where:{id: user.id}})
                    return res.json({message: `Пользователь с id = ${id} удален`})
                } catch(e) {
                    next(ApiError.badRequest(e.message))
                }
            } else {
                next(ApiError.badRequest(`Пользователь с id = ${id} не найден`))
            }
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {

        const id = req.params.id
        return await UserController.getUserDeep(id, res, next)
    }

    async getAll(req, res, next) {

        let {search, limit, page} = req.query
        let users = [];

        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit

        try {
            if (search) {
                users = await User.findAndCountAll({
                    where: {
                        name: {[Op.iLike]: `%${search}%`}
                    }, limit, offset})
            } else {
                users = await User.findAndCountAll({limit, offset})
            }
            return res.json(users)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new UserController()
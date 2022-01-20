const {UsrPair, User, UsrHobby, Hobby} = require('../models/models')
const ApiError = require('../error/ApiError');

class PairController{
    async create(req, res) {
        const {santa_id, rec_id} = req.body
        const pair = await UsrPair.create({santa_id, rec_id})
        return res.json(pair)
    }

    async createAll(req, res, next) {

        const users = await User.findAll()
        let users_ext = [];

        if (users && users.length) {

            try {
                await UsrPair.destroy({where: {}, truncate: true})
            } catch (e) {
                next(ApiError.badRequest(e.message))
            }

            users.forEach(user => {
                users_ext.push({sort: Math.random(), id: user.id});
            })

            users_ext.sort(function (a, b) {
                if (a.sort > b.sort) {
                    return 1;
                }
                if (a.sort < b.sort) {
                    return -1;
                }
                return 0;
            });

            let prev_id = users_ext[users_ext.length - 1].id;

            for await (const i of users_ext) {
                try {
                    const pair = await UsrPair.create({
                        santa_id: prev_id,
                        rec_id: i.id
                    })

                    prev_id = i.id
                } catch (e) {
                    next(ApiError.badRequest(e.message))
                }
            }
        }

        try {
            const pairs = await UsrPair.findAll()
            return res.json(pairs)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {santa_id, rec_id, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let pairs;
        if (!santa_id && !rec_id) {
            pairs = await UsrPair.findAndCountAll({limit, offset})
        }
        if (!santa_id && rec_id) {
            pairs = await UsrPair.findAndCountAll({where:{santa_id}, limit, offset})
        }
        if (santa_id && !rec_id) {
            pairs = await UsrPair.findAndCountAll({where:{rec_id}, limit, offset})
        }
        if (santa_id && rec_id) {
            pairs = await UsrPair.findAndCountAll({where:{santa_id, rec_id}, limit, offset})
        }
        return res.json(pairs)
    }

    async getOneBySanta(req, res, next) {

        const santa_id = req.params.id

        try {
            const user = await UsrPair.findOne({
                where:{santa_id},
                include: [{
                    model: User,
                    as: 'receiverUser',
                    required: true,
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
}

module.exports = new PairController()
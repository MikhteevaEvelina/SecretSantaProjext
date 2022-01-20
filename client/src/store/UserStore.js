import {makeAutoObservable} from "mobx";

export default class UserStore{
    constructor() {
        this._isAuth = false
        this._user = {
            id: 0,
            name: "",
            img: "",
            sex: "М",
            age: "",
            role: "USER",
            post_adr: "",
            userHobby: [],
            file: {}
        }

        makeAutoObservable(this)
    }

    setIsAuth(flag) {
        this._isAuth = flag
    }

    setUser(user) {
        this._user = user
    }

    setName(name) {
        this._user.name = name
    }

    setAge(age) {
        this._user.age = age
    }

    setSex(sex) {
        this._user.sex = sex
    }

    setAddress(post_adr) {
        this._user.post_adr = post_adr
    }

    setImg(img) {
        this._user.img = img
    }

    setFile(file) {
        this._user.file = file
    }

    setUserHobby(hobbies) {
        this._user.userHobby = hobbies
    }

    get id() {
        return this._user.id
    }

    get name() {
        return this._user.name
    }

    get age() {
        return this._user.age
    }
    get role() {
        return this._user.role
    }

    get sex() {
        return this._user.sex
    }

    get img() {
        return this._user.img
    }

    get file() {
        return this._user.file
    }

    get post_adr() {
        return this._user.post_adr
    }

    get userHobby() {
        return this._user.userHobby
    }

    get isAuth() {
        return this._isAuth
    }

    get user() {
        return this._user
    }
}
import {makeAutoObservable} from "mobx";

export default class RecipientStore{

    constructor() {

        this._recipient = {
            id: 0,
            name: "Участник не определен",
            img: "",
            sex: "Не указан",
            age: "Не указан",
            post_adr: "Не указан",
            userHobby: [],
        }

        makeAutoObservable(this)
    }

    setIsAuth(flag) {
        this._isAuth = flag
    }

    setRecipient(recipient) {
        this._recipient = recipient
    }

    setName(name) {
        this._recipient.name = name
    }

    setAge(age) {
        this._recipient.age = age
    }

    setSex(sex) {
        this._recipient.sex = sex
    }

    setAddress(post_adr) {
        this._recipient.post_adr = post_adr
    }

    setImg(img) {
        this._recipient.img = img
    }

    setUserHobby(hobbies) {
        this._recipient.userHobby = hobbies
    }

    get id() {
        return this._recipient.id
    }

    get name() {
        return this._recipient.name
    }

    get age() {
        return this._recipient.age
    }

    get sex() {
        return this._recipient.sex
    }

    get img() {
        return this._recipient.img
    }

    get post_adr() {
        return this._recipient.post_adr
    }

    get userHobby() {
        return this._recipient.userHobby
    }

    get isAuth() {
        return this._isAuth
    }

    get recipient() {
        return this._recipient
    }
}
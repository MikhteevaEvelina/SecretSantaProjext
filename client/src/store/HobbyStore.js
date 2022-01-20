import {makeAutoObservable} from "mobx";

export default class HobbyStore{
    constructor() {
        this._hobbies = [
            {id: 1, name: 'Рыбалка'},
            {id: 2, name: 'Чтение'},
            {id: 3, name: 'Кулинария'},
            {id: 4, name: 'Лыжи'},
        ]
        makeAutoObservable(this)
    }

    setHobbies(hobbies) {
        this._hobbies = hobbies
    }

    get hobbies() {
        return this._hobbies
    }
}
import {makeAutoObservable} from "mobx";

export default class ParticipantStore{
    constructor() {
        this._page = 1
        this._totalCount = 0
        this._limit = 12
        this._search = ""
        this._participants = [
            //{id: 1, name: 'Эвелина', img: 'http://www.lessdraw.com/wp-content/uploads/2020/12/2-1.jpeg'},
            //{id: 2, name: 'Саша', img: 'http://www.lessdraw.com/wp-content/uploads/2020/12/7-1.jpeg'},
            //{id: 3, name: 'Егор', img: 'http://www.lessdraw.com/wp-content/uploads/2020/12/8-1.jpeg'},
            //{id: 4, name: 'Танька', img: 'http://www.lessdraw.com/wp-content/uploads/2019/05/13.jpg'},
            //{id: 5, name: 'Кузьмина', img: 'http://www.lessdraw.com/wp-content/uploads/2020/12/14-1.jpeg'},
            //{id: 6, name: 'Петя', img: 'http://www.lessdraw.com/wp-content/uploads/2020/10/17-1.jpeg'},
            //{id: 7, name: 'Марина', img: 'http://www.lessdraw.com/wp-content/uploads/2020/12/20.jpeg'},
            //{id: 8, name: 'Никита', img: 'http://www.lessdraw.com/wp-content/uploads/2020/12/12-1.jpeg'},
            //{id: 9, name: 'Лена', img: 'http://www.lessdraw.com/wp-content/uploads/2020/12/10-1.jpeg'},
            //{id: 10, name: 'Магда', img: 'http://www.lessdraw.com/wp-content/uploads/2020/12/3-1.jpeg'},
            // {id: 11, name: 'Магда', img: 'http://www.lessdraw.com/wp-content/uploads/2020/12/3-1.jpeg'},
            // {id: 12, name: 'Магда', img: 'http://www.lessdraw.com/wp-content/uploads/2020/12/3-1.jpeg'},
            // {id: 13, name: 'Магда', img: 'http://www.lessdraw.com/wp-content/uploads/2020/12/3-1.jpeg'},
            // {id: 14, name: 'Магда', img: 'http://www.lessdraw.com/wp-content/uploads/2020/12/3-1.jpeg'},
            // {id: 15, name: 'Магда', img: 'http://www.lessdraw.com/wp-content/uploads/2020/12/3-1.jpeg'},
            // {id: 16, name: 'Магда', img: 'http://www.lessdraw.com/wp-content/uploads/2020/12/3-1.jpeg'},
            // {id: 17, name: 'Магда', img: 'http://www.lessdraw.com/wp-content/uploads/2020/12/3-1.jpeg'},
            // {id: 18, name: 'Магда', img: 'http://www.lessdraw.com/wp-content/uploads/2020/12/3-1.jpeg'},
            // {id: 19, name: 'Магда', img: 'http://www.lessdraw.com/wp-content/uploads/2020/12/3-1.jpeg'},
            // {id: 20, name: 'Магда', img: 'http://www.lessdraw.com/wp-content/uploads/2020/12/3-1.jpeg'},
            // {id: 21, name: 'Магда', img: 'http://www.lessdraw.com/wp-content/uploads/2020/12/3-1.jpeg'},
            // {id: 22, name: 'Магда', img: 'http://www.lessdraw.com/wp-content/uploads/2020/12/3-1.jpeg'},
            // {id: 23, name: 'Магда', img: 'http://www.lessdraw.com/wp-content/uploads/2020/12/3-1.jpeg'},
            // {id: 24, name: 'Магда', img: 'http://www.lessdraw.com/wp-content/uploads/2020/12/3-1.jpeg'},
            // {id: 25, name: 'Магда', img: 'http://www.lessdraw.com/wp-content/uploads/2020/12/3-1.jpeg'},
            // {id: 26, name: 'Магда', img: 'http://www.lessdraw.com/wp-content/uploads/2020/12/3-1.jpeg'},
        ]
        makeAutoObservable(this)
    }

    setParticipants(participants) {
        this._participants = participants
    }

    setPage(page) {
        this._page = page
    }

    setLimit(limit) {
        this._limit = limit
    }

    setTotalCount(count) {
        this._totalCount = count
    }

    setSearch(search) {
        this._search = search
    }

    get participants() {
        return this._participants
    }

    get totalCount() {
        return this._totalCount
    }

    get page() {
        return this._page
    }

    get limit() {
        return this._limit
    }

    get search() {
        return this._search
    }
}
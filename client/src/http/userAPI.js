import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password, role: 'USER'})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

const parseUser = (data) => {

    if (data.userHobby && data.userHobby.length) {
        let hobbies = []
        data.userHobby.forEach(h => {
            if (h.hobby) {
                hobbies.push(h.hobby)
            }
        })

        data.userHobby = hobbies
    }

    return data
}

export const update = async (id, formData) => {
    const {data} = await $authHost.put('api/user/' + id, formData)
    return parseUser(data)
}

export const deleteOne = async (id) => {
    const {data} = await $authHost.delete('api/user/' + id)
    return data
}

export const fetchOneUser = async (id) => {
    const {data} = await $authHost.get('api/user/' + id)
    return parseUser(data)
}
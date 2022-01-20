import {$authHost} from "./index";

const parseRecipient = (data) => {

    if (data.userHobby && data.userHobby.length) {
        let hobbies = []
        data.userHobby.forEach(h =>{
            if (h.hobby) {
                hobbies.push(h.hobby)
            }
        })

        data.userHobby = hobbies
    }

    data.sex = 'М' ? "Мужской" : "Женский";

    return data
}

export const fetchOneByUser = async (id) => {
    try {
        const {data} = await $authHost.get('api/pair/' + id)
        return parseRecipient(data.receiverUser)
    } catch (e) {
        return {}
    }
}
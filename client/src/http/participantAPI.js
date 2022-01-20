import {$host} from "./index";
import noPhoto from '../assets/noPhoto.jpg'

export const fetchParticipants = async (search, page, limit=9) => {
    try {
        const {data} = await $host.get('api/user/', {params: {search, page, limit}})
        if (data && data.rows.length) {
            data.rows.forEach(i => {
                i.img = i.img ? (process.env.REACT_APP_API_URL + i.img) : noPhoto
            })
        }
        return data
    } catch (e) {
        return []
    }
}
import {$authHost} from "./index";

export const generate = async () => {
    try {
        const {data} = await $authHost.post('api/pair/generate')
        return data
    } catch (e) {
        return {}
    }
}
import {$host} from "@/api/index";

export const createBasket = async (token) => {
    const {data} = await $host.post(`basket`, {token})
    return data
}

export const createBasketItem = async (basketToken, bookId) => {
    const {data} = await $host.post(`basket-item`, {basketToken, bookId})
    return data
}

export const getAllBasketItem = async (token) => {
    const {data} = await $host.get(`basket-item/by-basket-token/${token}`)
    return data
}

export const getBasketByToken = async (token) => {
    const {data} = await $host.get(`basket/by-token/${token}`)
    return data
}

export const removeBasketItem = async (id) => {
    const {data} = $host.delete(`basket-item/${id}`)
    return data
}

export const cleanBasket = async (token) => {
    const {data} = $host.post(`basket/clean`, {token})
    return data
}
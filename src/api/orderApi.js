import {$host} from "@/api/index";

export const createPayment = async (price, name, email, bookIds) => {
    const {data} = await $host.post(`order/create-payment/`, {price, name, email, bookIds})
    return data
}

export const checkForPayOrder = async (token) => {
    const {data} = await $host.get(`order/check-order-for-pay/${token}`)
    return data
}

export const getOrderByNumber = async (number) => {
    const {data} = await $host.get(`order/by-number/${number}`)
    return data
}

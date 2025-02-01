import {$host} from "@/api/index";

export const getBooksByFilter = async (page, max_price, min_price, genres, name) => {
    const {data} = await $host.post(`book/by-filter`, {page, max_price, min_price, genres, name})
    return data
}

export const getPrices = async () => {
    const {data} = await $host.get(`book/prices`)
    return data
}

export const getBookByToken = async (token) => {
    const {data} = await $host.get(`book/by-token/${token}`)
    return data
}

export const getLastBook = async () => {
    const {data} = await $host.get(`book/last-book`)
    return data
}

export const getBooksByIds = async (array) => {
    const {data} = await $host.get(`book/by-ids-array/${array}`)
    return data
}

export const getBooksByOrderId = async (id) => {
    const {data} = await $host.get(`book/by-order-id/${id}`)
    return data
}

export const downloadBook = async (filename, type) => {
    const {data} = await $host.get(`book/download-book/?filename=${filename}&type=${type}`, {responseType: 'blob'})
    return data
}
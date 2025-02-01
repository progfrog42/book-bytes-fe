import {$host} from "@/api/index";

export const getAllGenres = async () => {
    const {data} = await $host.get('genre')
    return data
}

export const getAllGenreByBookId = async (id) => {
    const {data} = await $host.get(`genre/by-book-id/${id}`)
    return data
}
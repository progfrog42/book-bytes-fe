import {
    ADD_BASKET_ITEM,
    DELETE_BASKET_ITEM,
    SET_BASKET_ITEMS_LIST
} from "@/store/reducers/basketReducer/basketItemReducerActions";

export const addBasketItem = (payload) => {
    return {type: ADD_BASKET_ITEM, payload}
}

export const setBasketItems = (payload) => {
    return {type: SET_BASKET_ITEMS_LIST, payload}
}

export const deleteBasketItem = (payload) => {
    return {type: DELETE_BASKET_ITEM, payload}
}
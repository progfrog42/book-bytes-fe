import {
    ADD_BASKET_ITEM,
    DELETE_BASKET_ITEM,
    SET_BASKET_ITEMS_LIST
} from "@/store/reducers/basketReducer/basketItemReducerActions";

const initialState = {
    _basketItems: [],
}

export const basketItemReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BASKET_ITEMS_LIST:
            return {...state, _basketItems: action.payload}
        case ADD_BASKET_ITEM:
            return {...state, _basketItems: [...state._basketItems, action.payload]}
        case DELETE_BASKET_ITEM:
            return {...state, _basketItems: state._basketItems.filter(el => el.id !== action.payload.id)}
        default:
            return state
    }
}
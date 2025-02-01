import {SET_FIND_BOOK} from "@/store/reducers/finderReducer/finderReducerActions";

const initialState = {
    find: ''
}

export const finderReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FIND_BOOK:
            return {...state, find: action.payload}
        default:
            return state
    }
}
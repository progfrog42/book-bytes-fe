import {SET_FIND_BOOK} from "@/store/reducers/finderReducer/finderReducerActions";

export const setFinderText = (payload) => {
    return {type: SET_FIND_BOOK, payload}
}
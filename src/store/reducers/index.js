import {combineReducers} from "redux";
import {HYDRATE} from "next-redux-wrapper";
import {notificationReducer} from "@/store/reducers/notificationReducer/notificationReducer";
import {basketItemReducer} from "@/store/reducers/basketReducer/basketItemReducer";
import {finderReducer} from "@/store/reducers/finderReducer/finderReducer";

const rootReducer = combineReducers({
    notifications: notificationReducer,
    basketItems: basketItemReducer,
    finder: finderReducer
})

export const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        };
        if (state.count) nextState.count = state.count;
        return nextState;
    } else {
        return rootReducer(state, action);
    }
};
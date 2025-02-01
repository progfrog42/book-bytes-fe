import {
    ADD_NOTIFICATION,
    DELETE_NOTIFICATION,
    SET_NOTIFICATION_LIST
} from "@/store/reducers/notificationReducer/notificationReducerActions";

const initialState = {
    _notifications: [],
}

export const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NOTIFICATION_LIST:
            return {...state, _notifications: action.payload}
        case ADD_NOTIFICATION:
            return {...state, _notifications: [...state._notifications, action.payload]}
        case DELETE_NOTIFICATION:
            return {...state, _notifications: state._notifications.filter(el => el.id !== action.payload.id)}
        default:
            return state
    }
}
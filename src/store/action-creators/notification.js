import {
    ADD_NOTIFICATION,
    DELETE_NOTIFICATION,
} from "@/store/reducers/notificationReducer/notificationReducerActions";

export const addNotification = (payload) => {
    return {type: ADD_NOTIFICATION, payload}
}

export const deleteNotification = (payload) => {
    return {type: DELETE_NOTIFICATION, payload}
}
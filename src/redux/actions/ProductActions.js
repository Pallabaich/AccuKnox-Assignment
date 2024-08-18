import { ActionTypes } from '../constants/ActionTypes.js'


export const append = (products) => {
    return {
        type: ActionTypes.SET_ADD_WIDGET,
        payload: products,
    }
}
export const deleteMyWidget = (products) => {
    return {
        type: ActionTypes.SET_DELETE_WIDGET,
        payload: products,
    }
}
export const update = (products) => {
    return {
        type: ActionTypes.SET_UPDATE_WIDGET,
        payload: products,
    }
}

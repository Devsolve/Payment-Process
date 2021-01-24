import { DOING_PAYMENT,ERROR_DOING_PAYMENT,RESULT } from "../action/Action";


export const newDoingPaymentReducerHere = (state={}, action) => {
    switch(action.type) {
        case DOING_PAYMENT:
            return {...state, data: action.payload}
        case ERROR_DOING_PAYMENT:
            return {...state, data: action.payload}
        default:
            return state;    
    }
}


export const resultMsgReducerHere = (state={}, action) => {
    switch(action.type) {
        case RESULT:
            return {...state, data: action.payload};
        default:
            return state;    
    }
}
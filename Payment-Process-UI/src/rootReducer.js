import {combineReducers} from 'redux';
import { newDoingPaymentReducerHere,resultMsgReducerHere } from "../src/payment_gateway/api/reducer/Reducer";


export const rootReducer = combineReducers ({

    newDoingPaymentReducer : newDoingPaymentReducerHere,
    resultMsgReducer : resultMsgReducerHere
})


export default rootReducer;
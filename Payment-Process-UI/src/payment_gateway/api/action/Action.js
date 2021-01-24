import axios from 'axios';
import { httpGetConfig, httpPostConfig } from '../../utilities/AppUtilities';


export const DOING_PAYMENT = 'DOING_PAYMENT';
export const ERROR_DOING_PAYMENT = 'ERROR_DOING_PAYMENT';

export const newDoingPayment = (dispatch, data) => {
    let url = "http://127.0.0.1:4570/payment_details/add";
    const config = httpPostConfig(url, data);
    axios(config).then(response => {
        const data = response.data;
        resultMsg (dispatch,data.message,data.success)
        dispatch({ type: DOING_PAYMENT, payload: response.data });
    }).catch(error => {
        dispatch({ type: ERROR_DOING_PAYMENT, payload: error });
    })
}


export const RESULT = 'RESULT';

export const resultMsg = (dispatch,message,success) => {
    dispatch({type: RESULT, payload:{message,success}})
}
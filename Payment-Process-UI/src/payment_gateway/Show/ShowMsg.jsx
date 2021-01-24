import React from 'react';
import {useDispatch,useSelector} from 'react-redux';
import  {resultMsg}  from '../api/action/Action';
import {Alert} from 'reactstrap';


export const ShowMsg = () => {

    const resultMsgReducer = useSelector((state)=>{
        return {...state.resultMsgReducer}
    });

    const result = resultMsgReducer.data;

    let message = null, success = false, show = false;
    if(result) {
        message= result.message;
        success= result.success;
    }

    const dispatch = useDispatch();

    const onClose = () => {
        resultMsg(dispatch,null,false);
    }


    let view = <div/>;

    if (message) {
        show = true;
        let varient = 'danger';
        let heading = 'Failure!!';
        if (success) {
            varient = 'success';
            heading = 'Success!!'
        }

        view = (
            <Alert color = {varient} isOpen={show} toggle={onClose}>
                <h3> {heading} </h3>
                <h5> {message} </h5>
            </Alert>
        );
    }

    return view;

};

export default ShowMsg;
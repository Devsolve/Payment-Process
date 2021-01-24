import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { newDoingPayment } from '../api/action/Action';
import { Label, Input, Button, Form } from 'reactstrap';
import ShowMsg from '../Show/ShowMsg';


const PaymentProcess = () => {

    const [credit_card_number, setCredit_card_number] = useState('');
    const [card_holder, setCard_holder] = useState('');
    const [expiry_date, setExpiry_date] = useState('');
    const [security_code, setSecurity_code] = useState('');
    const [amount, setAmount] = useState('');


    const [validationMsg, setValidationMsg] = useState('');

    const dispatch = useDispatch();


    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === 'credit_card_number') {
            setCredit_card_number(value);
        }
        else if (name === 'card_holder') {
            setCard_holder(value);
        }
        else if (name === 'expiry_date') {
            setExpiry_date(value);
        }
        else if (name === 'security_code') {
            setSecurity_code(value);
        }
        // else if (name === 'amount') {
        //     setAmount(value);
        // }
    }


    const handleChange = (e) => {
        let amount = parseFloat(e.target.value);

        if (isNaN(amount) || amount < 0 || e.target.value[0] === '0') {
            amount = null;
        }
        else{
            setAmount(amount);
        }
    }


    const reset = () => {
        setCredit_card_number('');
        setCard_holder('');
        setExpiry_date('');
        setSecurity_code('');
        setAmount('');
    }

    const newPayment = () => {
        let data = { credit_card_number, card_holder, expiry_date, security_code, amount }
        console.log('**data:', data)
        const msg = validate(data);
        if (msg && (msg.credit_card_number || msg.card_holder || msg.expiry_date || msg.amount || msg.security_code)) {
            setValidationMsg(msg);
        }
        else {
            newDoingPayment(dispatch, data)
            reset();
        }
    }


    const validate = (data) => {
        let errors = {};
        let emptyFields = [];


        let creditCard_number = data.credit_card_number
        let re1 = new RegExp('^[0-9]+$','i')
        if (!creditCard_number) {
            emptyFields.push('credit_card_number');
            errors.credit_card_number = '16 digits Number Required';
        }
        else if (!re1.test(creditCard_number)) {
            errors.credit_card_number = 'Plese input a valid Credit card Number'
        }



        let cardHolder = data.card_holder
        let re2 = new RegExp('^[A-Za-z, ]+$','i')
        if (!cardHolder) {
            emptyFields.push('card_holder');
            errors.card_holder = 'Name Required';
        }
        else if (!re2.test(cardHolder)) {
            errors.card_holder = "Proper Name required";
        }




        let expiryDate = data.expiry_date;
        let re = new RegExp('^((0?[1-9]|1[012])[- /.] ?[2-3]|[0-9])*$','i')

        if (!expiryDate) {
            emptyFields.push('expiry_date');
            errors.expiry_date = 'Expiry-Date Required';
        }
        else if (!re.test(expiryDate)) {
            errors.expiry_date = 'Plesa input a valid date'
        }



        let securityCode = data.security_code
        let re3 = new RegExp('^[0-9]+$','i')

        if (!securityCode) {
            emptyFields.push('security_code');
            errors.security_code = '3 digits CVV Code Required';
        }
        else if(!re3.test(securityCode)) {
            errors.security_code = 'Plese input a valid CVV code'
        }


        if (!data.amount) {
            emptyFields.push('amount');
            errors.amount = 'amount Required';
        }


        return errors;
    }


    

    return (
        <div>
            <ShowMsg/>
            <Form className="payment-details">
                <p className="heading"> <b>PAYMENT DETAILS</b> </p>
                <div>
                    <Label for='credit_card_number'>Credit Card Number</Label>
                    <br />
                    <Input type='text' id='credit_card_number' name='credit_card_number' value={credit_card_number} onChange={onChange} placeholder='1234 5678 9012 3454' size='17' maxLength='16' minLength='16' />
                </div>
               
                    {validationMsg && <small style={{ 'color': 'red' }}> {validationMsg.credit_card_number} </small>}
                

                <div>
                    <Label for='card_holder'>card_holder's Name</Label>
                    <br />
                    <Input type='text' id='card_holder' name='card_holder' value={card_holder} onChange={onChange} placeholder="Name" />

                    {validationMsg && <small style={{ 'color': 'red' }}> {validationMsg.card_holder} </small>}
                </div>

                <div className="form-group pt-2">
                    <div className="row d-flex">
                        <div className="col-sm">
                            <Label for='expiry_date'>Expiry Date</Label>
                            <br />
                            <Input type="datetime" id='expiry_date' name='expiry_date' value={expiry_date} onChange={onChange} placeholder='MM/YYYY' size='7' maxLength='7' minLength='7' />

                            {validationMsg && <small style={{ 'color': 'red' }}> {validationMsg.expiry_date} </small>}
                        </div>

                        <div className="col-sm">
                            <Label for='security_code'>Security Code</Label>
                            <br />
                            <Input type='password' id='security_code' name='security_code' value={security_code} onChange={onChange} placeholder='&#9679;&#9679;&#9679;' size='3' maxLength='3' minLength='3' />

                            {validationMsg && <small style={{ 'color': 'red' }}> {validationMsg.security_code} </small>}
                        </div>

                        <div className="col-sm">
                            <Label for='amount'>Amount</Label>
                            <br />
                            <input type="number" min='1' step='1' id='amount' name='amount' value={amount} onChange={handleChange} placeholder='Amount' />

                            {validationMsg && <small style={{ 'color': 'red' }}> {validationMsg.amount} </small>}
                        </div>
                    </div>
                </div>

                <div className="col-sm-5 pt-0">
                    <Button color='primary' size='sm' block onClick={newPayment}> Do Payment </Button>
                </div>

            </Form>
        </div>
    )
}

export default PaymentProcess;
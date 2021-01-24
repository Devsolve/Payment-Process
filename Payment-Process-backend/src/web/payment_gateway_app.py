from flask import Flask, request
from flask_cors import CORS

from src.repository.payment_details import process_card_payment

app = Flask( __name__ )
CORS( app )


@app.route( '/payment_details/add', methods=['POST'] )
def insert_payment_details():
    payment_details_json = request.get_json()
    credit_card_number = payment_details_json['credit_card_number']
    card_holder = payment_details_json['card_holder']
    expiry_date = payment_details_json['expiry_date']
    security_code = payment_details_json['security_code']
    amount = payment_details_json['amount']

    print( 'payment_details_json credit_card_number:{0}, card_holder: {1}, expiry_date: {2}, security_code: {3}, '
           'amount: {4}'.format( credit_card_number, card_holder, expiry_date, security_code, amount ) )

    return process_card_payment( credit_card_number, card_holder, expiry_date, security_code, amount )


if __name__ == '__main__':
    app.run( debug=True, port=4570 )

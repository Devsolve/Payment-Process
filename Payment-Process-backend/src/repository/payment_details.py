import json

import pandas as pd

from src.config.db_config import Dbconfig
from src.model.payment_gateway_model import card_details
from src.service.CheapPaymentGateway import CheapPaymentGateway
from src.service.ExpensivePaymentGateway import ExpensivePaymentGateway
from src.service.PremiumPaymentGateway import PremiumPaymentGateway


# select payment gateway by amount

# process payment

# on successful payment save card detail with payment status success else failure


def process_card_payment(credit_card_number, card_holder, expiry_date, security_code, amount):
    # do payment based on amount
    payment_status = do_payment_on_gateway( amount )
    # save card detail
    return save_card_details( credit_card_number, card_holder, expiry_date, security_code, amount, payment_status )


# Save the Card details
def save_card_details(credit_card_number, card_holder, expiry_date, security_code, amount, payment_status):
    transaction_no = None
    dc = Dbconfig()
    session = dc.get_session()
    msg = ''
    success = False
    try:
        session.begin()
        dp = card_details( credit_card_number=credit_card_number, card_holder=card_holder,
                           expiry_date=expiry_date, security_code=security_code, amount=amount,
                           payment_status=payment_status )
        session.add( dp )
        session.commit()
        transaction_no = dp.transaction_no
        print( "dp*** {}".format( dp.transaction_no ) )
        print( 'get_customer_details added: {0}'.format( dp ) )
        msg = 'Payment process successful with transaction_no : {}'.format( transaction_no )
        success = True
    except Exception as e:
        msg = 'Payment process Failed'
        session.rollback()
        print( 'Exception in get_customer_details {0}'.format( e ) )
    return json.dumps( {'message': msg, 'success': success} )


# Knowing the payment gateway name on the basis of amount
def do_payment_on_gateway(amount):
    pmnt_status = False
    dc = Dbconfig()
    try:
        sql = 'select payment_gateway_name from payment_gateway where :amount between min_amount and max_amount'
        result = pd.read_sql_query( sql=sql, con=dc.get_engine(), params={'amount': amount} )
        gateway_name = result.values[0][0]
        print( '******result: ', result.values[0][0] )
        if gateway_name == "CheapPaymentGateway":
            pmnt_status = CheapPaymentGateway( amount )

        elif gateway_name == "ExpensivePaymentGateway":
            pmnt_status = ExpensivePaymentGateway( amount )

        elif gateway_name == "PremiumPaymentGateway":
            pmnt_status = PremiumPaymentGateway( amount )

    except Exception as e:
        print( 'Exception in getting_payment_gateway_name {0}'.format( e ) )
    return pmnt_status


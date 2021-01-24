import traceback


def ExpensivePaymentGateway(amount):
    payment_status = 'Failure'
    try:
        if amount == 0:
            payment_status = 'Failure'
        else:
            # Add API call
            payment_status = 'Success'
        print( 'in ExpensivePaymentGateway' )
        pass
    except Exception as e:
        print( 'Failed to process payment' )
        traceback.print_exc()
        raise
    return payment_status

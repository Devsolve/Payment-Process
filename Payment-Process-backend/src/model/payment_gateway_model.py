from sqlalchemy import Column, INTEGER, String, FLOAT, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func

from src.config.db_config import Dbconfig

dc = Dbconfig()

Base = declarative_base()


class card_details( Base ):
    __tablename__ = 'card_details'
    transaction_no = Column( INTEGER, primary_key=True, autoincrement=True )
    credit_card_number = Column( String( 16 ), nullable=False )
    card_holder = Column( String, nullable=False )
    expiry_date = Column( String, nullable=False )
    security_code = Column( INTEGER )
    amount = Column( FLOAT, nullable=False )
    payment_status = Column(String(50))
    updated_on = Column( DateTime( timezone=True ), default=func.now() )


class payment_gateway( Base ):
    __tablename__ = 'payment_gateway'
    payment_gateway_name = Column( String, primary_key=True )
    min_amount = Column( FLOAT )
    max_amount = Column( FLOAT )

# Base.metadata.drop_all(dc.get_engine())
# Base.metadata.create_all(dc.get_engine())

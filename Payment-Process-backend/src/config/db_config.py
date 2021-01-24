from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


# def get_new_session(engine):
#     Session = sessionmaker( bind=engine, autocommit=True )
#     return Session()


class Dbconfig:

    def __init__(self):
        self.db_path = '../../resources/payment_gateway.db'
        self.engine = create_engine( 'sqlite:///' + self.db_path, echo=True )
        print( 'DB created...' )

    def get_engine(self):
        return self.engine

    def get_session(self):
        Session = sessionmaker( bind=self.engine, autocommit=True )
        return Session()




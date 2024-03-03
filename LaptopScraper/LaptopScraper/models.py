from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base

database_url = ""
engine = create_engine(database_url)

Base = declarative_base()


class Laptop(Base):
    __tablename__ = 'laptops'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(1024))
    brand = Column(String(100))
    original_price = Column(Float)
    discounted_price = Column(Float)
    absolute_savings = Column(Float)
    relative_savings = Column(Float)
    cpu = Column(String(256))
    gpu = Column(String(256))
    ssd_hdd = Column(String(256))
    screen_diagonal = Column(String(32))
    ram = Column(String(128))
    url = Column(String(1024))
    shop = Column(String(50))
    
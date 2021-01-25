import youtube_module
import melon_module


song = '혁오-love ya!'
html = youtube_module.search_music(song)
data = youtube_module.find_comment(html)
data2 = melon_module.melon_crawling(song)



# 여기부터 MySQL 저장
import pymysql
from sqlalchemy import create_engine

pymysql.install_as_MySQLdb()
import MySQLdb

engine = create_engine("mysql://root:"+"1234"+"@10.178.0.2/app", encoding='utf-8')
# "mysql://아이디:"+"비밀번호"+"@mysql주소:포트/DB이름"

connect = engine.connect()

data.to_sql(name='comment',con=engine, if_exists='append', index=False)
data2.to_sql(name='comment',con=engine, if_exists='append', index=False)
# (name=테이블이름, con=engine, if_exists='append', index=False)

sql = 'select * from comment'

connect.close()

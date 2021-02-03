import youtube_module
import melon_module
import information_module

title = 'All I Wanna Do'
singer = 'Jay park'

html = youtube_module.search_music(title,singer)
data = youtube_module.find_comment(html,title,singer)
data2 = melon_module.melon_crawling(title,singer)
data3 = information_module.find_inforamation(title,singer)

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
data3.to_sql(name="music", con=engine, if_exists="append", index=False)
# (name=테이블이름, con=engine, if_exists='append', index=False)

connect.close()

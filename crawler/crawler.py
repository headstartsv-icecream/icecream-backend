import youtube_module
import melon_module
import information_module

<<<<<<< HEAD
def crawler_start(title,singer):
    html = youtube_module.search_music(title,singer)
    data = youtube_module.find_comment(html,title,singer)
    data2 = melon_module.melon_crawling(title,singer)
    data3 = information_module.find_inforamation(title,singer)


    # 여기부터 MySQL 저장
    import pymysql
    from sqlalchemy import create_engine

    pymysql.install_as_MySQLdb()
    import MySQLdb

    engine = create_engine("mysql://root:"+"1234"+"@34.64.111.47/app", encoding='utf-8')
    # "mysql://아이디:"+"비밀번호"+"@mysql주소:포트/DB이름"

    connect = engine.connect()

    data.to_sql(name='comment',con=engine, if_exists='append', index=False)
    data2.to_sql(name='comment',con=engine, if_exists='append', index=False)
    data3.to_sql(name="music", con=engine, if_exists="append", index=False)
    # (name=테이블이름, con=engine, if_exists='append', index=False)


    connect.close()

    conn = pymysql.connect(host='34.64.111.47', user='root', password='1234',
                        db='app', charset='utf8')
    
    # Connection 으로부터 Dictoionary Cursor 생성
    curs = conn.cursor(pymysql.cursors.DictCursor)
    
    # SQL문 실행
    sql = "update comment c , music m set c.musicID = m.id where c.music = m.title and c.artist = m.artist;"
    curs.execute(sql)
    conn.commit()
    
    # Connection 닫기
    conn.close()
=======
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
>>>>>>> 2a8010b7021c9740936647cd6ed46afaaf880626

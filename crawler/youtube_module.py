import os
import sys
import time
import pandas as pd
from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from common.functions import ChromeDriver
# Add modules in common/functions.py  
sys.path.append(os.getcwd())

def find_comment(html_source):
    soup = BeautifulSoup(html_source, 'lxml')

    youtube_user_IDs = soup.select('div#header-author > a > span')
    youtube_comments = soup.select('yt-formatted-string#content-text')

    str_youtube_userIDs = []
    str_youtube_comments = []
    for i in range(len(youtube_user_IDs)):
        str_tmp = str(youtube_user_IDs[i].text)
        str_tmp = str_tmp.replace('\n', '')
        str_tmp = str_tmp.replace('\t', '')
        str_tmp = str_tmp.strip()
    
        str_youtube_userIDs.append(str_tmp)

        str_tmp = str(youtube_comments[i].text)
        str_tmp = str_tmp.replace('\n', ' ')
        str_tmp = str_tmp.replace('\t', '')
        str_tmp = str_tmp.strip()

        str_youtube_comments.append(str_tmp)
    pd_data = {"ID":str_youtube_userIDs, "Comment":str_youtube_comments}
    youtube_pd = pd.DataFrame(pd_data)
    return youtube_pd

def search_music(video):
    driver = ChromeDriver(headless=False).driver
    driver.get("https://www.youtube.com/")
    wait = WebDriverWait(driver, 3)
    visible = EC.visibility_of_element_located
    time.sleep(1)

    # 유튜브 검색창에 입력 후 엔터 입력
    search = driver.find_element_by_xpath('//input[@id="search"]')
    search.send_keys(video)
    time.sleep(1)
    search.send_keys(Keys.ENTER)


    # 찾은 동영상으로 이동
    driver.get("https://www.youtube.com/results?search_query=" + str(video))
    wait.until(visible((By.ID, "video-title")))
    driver.find_element_by_id("video-title").click()
    time.sleep(3)

    # 스크롤 내려서 댓글 불러오기
    driver.execute_script("window.scrollTo(0,100);")
    time.sleep(2) # 1초:6개 / 2초:16개 / 2.2초: 20개 / 2.5초:20개 / 3초:20개
    
    last_page_height = driver.execute_script("return document.documentElement.scrollHeight")
    while True:
        driver.execute_script("window.scrollTo(0, document.documentElement.scrollHeight);")
        time.sleep(1)
        new_page_height = driver.execute_script("return document.documentElement.scrollHeight")
        if new_page_height == last_page_height:
            break
        last_page_height = new_page_height

    # html 저장 후 드라이버 닫기
    html_source = driver.page_source
    driver.close()

    return html_source

"""

# 여기부터 MySQL 저장
import pymysql
from sqlalchemy import create_engine

pymysql.install_as_MySQLdb()
import MySQLdb

engine = create_engine("mysql://root:"+"1234"+"@localhost/opentutorials", encoding='utf-8')
# mysql://"아이디:"+"비밀번호"+"@mysql주소:포트/DB이름

conn = engine.connect()

youtube_pd.to_sql(name='test',con=engine, if_exists='append', index=False)
# (name=테이블이름, con=engine, if_exists='append', index=False)

conn.close() """



"""
CREATE TABLE `opentutorials`.`test` (
  `ID` VARCHAR(50) NOT NULL,
  `Comment` TEXT NULL,
  PRIMARY KEY (`ID`));
 테이블 생성 필요
 """

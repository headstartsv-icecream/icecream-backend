import os
import sys
import time
import pandas as pd
import datetime
from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from common.functions import ChromeDriver

# Add modules in common/functions.py
sys.path.append(os.getcwd())

# date 변경
def exchange_date(date_time):
    a = datetime.datetime.strptime(date_time,'%Y.%m.%d %H:%M')
    b = datetime.datetime.today()
    c = (b-a).total_seconds()
    if c > 31104000:
        d = str(int(c//31104000))+' year ago'
    elif c > 2592000:
        d = str(int(c//2592000))+' months ago'
    elif c > 604800:
        d = str(int(c//604800))+' week ago'
    elif c > 86400:
        d = str(int(c//86400))+' days ago'
    elif c > 3600:
        d = str(int(c//3600))+' hour ago'
    elif c > 60:
        d = str(int(c//60))+' minutes ago'
    else:
        d = 'now'
    return d

def melon_crawling(song):
    driver = ChromeDriver(headless=False).driver
    driver.get("https://www.melon.com/")
    wait = WebDriverWait(driver, 3)
    visible = EC.visibility_of_element_located
    time.sleep(1)

    search = driver.find_element_by_xpath('//input[@id="top_search"]')
    search.send_keys(song)
    search.send_keys(Keys.ENTER)
    time.sleep(1)

    driver.find_element_by_xpath('//*[@id="frm_songList"]/div/table/tbody/tr[1]/td[3]/div/div/a[1]/span').click() #노래 이동
    driver.find_element_by_xpath('//*[@id="d_cmtpgn_cmt_count_wrapper"]/ul/li[2]/a').click() #추천순으로 변경
    time.sleep(1)
    html_source = driver.page_source

    soup = BeautifulSoup(html_source, 'lxml')
    
    # 곡 제목
    title = soup.select_one('#downloadfrm > div > div > div.entry > div.info > div.song_name').get_text()
    title = title.replace('곡명','')
    title = title.strip()

    # 가수
    singer = soup.select_one('#downloadfrm > div > div > div.entry > div.info > div.artist > a > span:nth-child(1)').get_text()

    melon_user_IDs = soup.select('div.ellipsis > a.thumb.d_cmtpgn_user > span')
    melon_comments = soup.select('div.wrap_cntt.d_cmtpgn_cmt_cont_wrapper > div > div')
    melon_date = soup.select('div.wrap_cntt.d_cmtpgn_cmt_cont_wrapper > div > span.date')
    time.sleep(1)

    # 댓글 개수에 따라 반복 횟수 설정
    number_of_comments = int(soup.select_one('#d_cmtpgn_cmt_count_wrapper > div > strong > span').get_text().replace(',', ''))
    if number_of_comments % 10 == 0: number_of_comments -= 1
    repeat_num = 9 if number_of_comments > 100 else number_of_comments // 10

    for i in range(1,repeat_num+1):
        driver.find_element_by_xpath('//*[@id="d_cmtpgn_paginate_wrapper"]/span/a[%d]'%i).click() # 댓글이동
        time.sleep(1) # html을 온전히 불러오기 위한 대기
        html_source = driver.page_source
        
        soup = BeautifulSoup(html_source, 'lxml')
        melon_user_IDs += soup.select('div.ellipsis > a.thumb.d_cmtpgn_user > span')
        melon_comments += soup.select('div.wrap_cntt.d_cmtpgn_cmt_cont_wrapper > div > div')    
        melon_date += soup.select('div.wrap_cntt.d_cmtpgn_cmt_cont_wrapper > div > span.date')

    driver.close()

    str_melon_userIDs = []
    str_melon_comments = []
    str_melon_date = []
    for i in range(len(melon_user_IDs)):
        str_tmp = str(melon_user_IDs[i].text)
        str_melon_userIDs.append(str_tmp)

    for i in range(0,len(melon_comments),2):
        str_tmp = str(melon_comments[i].text)
        str_tmp = str_tmp.replace('\n', '')
        str_tmp = str_tmp.replace('\t', '')
        str_tmp = str_tmp.replace('내용','')
        str_tmp = str_tmp.strip()
        str_melon_comments.append(str_tmp)

    for i in range(0,len(melon_date),1):
        str_tmp = str(melon_date[i].text)
        str_tmp = str_tmp.strip()
        str_tmp = exchange_date(str_tmp)
        str_melon_date.append(str_tmp)
    
    print("melon 가져온 댓글 갯수: ",len(str_melon_userIDs))
    pd_data = {"Title":title,"Singer":singer,"ID":str_melon_userIDs, "Comment":str_melon_comments, "Date":str_melon_date, "Source":'melon'}
    melon_pd = pd.DataFrame(pd_data)
    
    return melon_pd, title, singer




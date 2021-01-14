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
    melon_user_IDs = soup.select('div.ellipsis > a.thumb.d_cmtpgn_user > span')
    melon_comments = soup.select('div.wrap_cntt.d_cmtpgn_cmt_cont_wrapper > div > div')
    melon_date = soup.select('div.wrap_cntt.d_cmtpgn_cmt_cont_wrapper > div > span.date')
    time.sleep(1)

    for i in range(1,10):
        driver.find_element_by_xpath('//*[@id="d_cmtpgn_paginate_wrapper"]/span/a[%d]'%i).click() # 댓글이동
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
        str_melon_comments.append(str_tmp)

    for i in range(0,len(melon_date),1):
        str_tmp = str(melon_date[i].text)
        str_melon_date.append(str_tmp)
    
    print("melon 가져온 댓글 갯수: ",len(str_melon_userIDs))
    pd_data = {"ID":str_melon_userIDs, "Comment":str_melon_comments, "Date":str_melon_date, "Source":'melon'}
    melone_pd = pd.DataFrame(pd_data)
    
    return melone_pd




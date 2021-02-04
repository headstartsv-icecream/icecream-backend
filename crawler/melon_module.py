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

def get_data(html_source):
    soup = BeautifulSoup(html_source, 'lxml')
    IDs = soup.select('div.ellipsis > a.thumb.d_cmtpgn_user > span')
    comments = soup.select('div.wrap_cntt.d_cmtpgn_cmt_cont_wrapper > div > div')
    dates = soup.select('div.wrap_cntt.d_cmtpgn_cmt_cont_wrapper > div > span.date')
    return IDs,comments,dates

def search_word(title,singer):
    return singer+'+'+title.replace(' ','+')

def melon_crawling(title,singer):
    driver = ChromeDriver(headless=False).driver

    # EC 변수
    wait = WebDriverWait(driver, 3)
    visible = EC.visibility_of_element_located # DOM에 나타남, 웹에 보여야 조건 만족

    driver.get("https://www.melon.com/search/total/index.htm?q="+str(search_word(title,singer)))

    driver.find_element_by_xpath('//*[@id="divCollection"]/ul/li[3]/a/span').click() # 검색 항목에서 '곡'으로 바꿈
    
    # 곡이 없으면 가수 이름으로 재검색
    try:
        driver.find_element_by_xpath('//*[@id="frm_defaultList"]/div/table/tbody/tr/td[3]/div/div/a[1]/span').click() # 첫 번째 곡 정보 선택
    except:
        driver.get("https://www.melon.com/search/total/index.htm?q="+str(singer.replace(' ','+')))
        driver.find_element_by_xpath('//*[@id="divCollection"]/ul/li[3]/a/span').click() # 검색 항목에서 '곡'으로 바꿈
        html_source = driver.page_source
        soup = BeautifulSoup(html_source, 'lxml')
        for i in range(1,50):
            song_name = soup.select_one('#frm_defaultList > div > table > tbody > tr:nth-child(%d) > td:nth-child(3) > div > div > a.fc_gray'%i).get_text()
            if (title in song_name):
                driver.find_element_by_xpath('//*[@id="frm_defaultList"]/div/table/tbody/tr[%d]/td[3]/div/div/a[1]/span'%i).click()
                break

    driver.find_element_by_xpath('//*[@id="d_cmtpgn_cmt_count_wrapper"]/ul/li[2]/a').click() #추천순으로 변경
    wait.until(visible((By.XPATH,'//*[@id="d_cmtpgn_cmt_list_wrapper"]/ul/li[1]'))) # html을 온전히 불러오기 위한 대기
    
    html_source = driver.page_source
    melon_user_IDs, melon_comments, melon_date  = get_data(html_source)

    # 반복 횟수 설정
    soup = BeautifulSoup(html_source, 'lxml')
    number_of_comments = int(soup.select_one('#d_cmtpgn_cmt_count_wrapper > div > strong > span').get_text().replace(',', ''))
    if number_of_comments % 10 == 0: number_of_comments -= 1
    repeat_num = 9 if number_of_comments > 100 else number_of_comments // 10

    for i in range(1,repeat_num+1):
        driver.find_element_by_xpath('//*[@id="d_cmtpgn_paginate_wrapper"]/span/a[%d]'%i).click() # 댓글이동
        time.sleep(1) # html을 온전히 불러오기 위한 대기
            
        melon_user_ID, melon_comment, melon_day = get_data(driver.page_source)
        melon_user_IDs += melon_user_ID
        melon_comments += melon_comment
        melon_date += melon_day

    driver.quit()

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
        str_melon_date.append(str_tmp)
    
    print("melon 가져온 댓글 갯수: ",len(str_melon_userIDs))
    
    pd_data = {"music":title,"artist":singer,"userName":str_melon_userIDs, "content":str_melon_comments, "writingDate":str_melon_date, "source":'melon'}
    melon_pd = pd.DataFrame(pd_data)
    
    return melon_pd

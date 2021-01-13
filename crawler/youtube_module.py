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
    print("댓글 갯수: ",len(str_youtube_userIDs))
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
    time.sleep(3) # 2초 설정시 못가져오는 경우 있음
    
    last_page_height = driver.execute_script("return document.documentElement.scrollHeight")
    
    maximum_comment = 0
    while True:
        driver.execute_script("window.scrollTo(0, document.documentElement.scrollHeight);")
        time.sleep(3) # 2초 설정시 못가져오는 경우 있음
        new_page_height = driver.execute_script("return document.documentElement.scrollHeight")
        if new_page_height == last_page_height or maximum_comment > 2: # maximum_comment: 댓글 최대 개수 설정
            break
        last_page_height = new_page_height
        maximum_comment += 1

    # html 저장 후 드라이버 닫기
    html_source = driver.page_source
    driver.close()

    return html_source
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

def find_comment(html_source,title,singer):
    soup = BeautifulSoup(html_source, 'lxml')

    youtube_user_IDs = soup.select('div#header-author > a > span')
    youtube_comments = soup.select('yt-formatted-string#content-text')
    youtube_date = soup.select('div#header-author > yt-formatted-string')

    str_youtube_userIDs = []
    str_youtube_comments = []
    str_youtube_date = []

    for i in range(len(youtube_user_IDs)):
        str_tmp = str(youtube_user_IDs[i].text)
        str_tmp = str_tmp.strip()
        str_youtube_userIDs.append(str_tmp)

        str_tmp = str(youtube_comments[i].text)
        str_tmp = str_tmp.replace('\n', ' ')
        str_tmp = str_tmp.replace('\t', '')
        str_tmp = str_tmp.strip()
        str_youtube_comments.append(str_tmp)

        str_youtube_date.append(str(youtube_date[i].text).replace('(edited)', ''))

    print("youtube 가져온 댓글 갯수: ",len(str_youtube_userIDs))
    pd_data = {"title":title,"artist":singer,"user_id":str_youtube_userIDs, "comment":str_youtube_comments,"creation_date":str_youtube_date, "source":'youtube'}
    youtube_pd = pd.DataFrame(pd_data)
    return youtube_pd


def search_music(title,singer):
    driver = ChromeDriver(headless=False).driver

    # EC 변수
    wait = WebDriverWait(driver, 3) # 3초동안 대기. 대기 중 조건 만족하면 넘어간다.
    visible = EC.visibility_of_element_located # DOM에 나타남, 웹에 보여야 조건 만족
    element = EC.presence_of_element_located # DOM에 나타남, 웹에 안보여도 조건 만족

    # 찾는 동영상으로 이동
    driver.get("https://www.youtube.com/results?search_query=" + str(singer+'+'+title))
    wait.until(element((By.ID, "video-title")))
    driver.find_element_by_id("video-title").click()
    
    # 영상 멈춤
    wait.until(element((By.ID, "movie_player"))) 
    driver.find_element_by_css_selector('#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-left-controls > button').click()

    # 스크롤 내려서 댓글 불러오기
    driver.execute_script("window.scrollTo(0,500);")
    
    # 상품 광고가 있는 경우 한번 더 스크롤 내림
    merch_shelf = True
    try:
        wait.until(visible((By.XPATH, '//*[@id="merch-shelf"]/ytd-merch-shelf-renderer')))
    except:
        merch_shelf = False
        print("상품 없음")
    if(merch_shelf):
        driver.execute_script("window.scrollTo(0,500);")

    for i in range(1,6):
        num = i * 20
        try:
            wait.until(element((By.XPATH,'//*[@id="contents"]/ytd-comment-thread-renderer[%d]'%num)))
        except:
            break
        else:
            driver.execute_script("window.scrollTo(0, document.documentElement.scrollHeight);")

    # html 저장 후 드라이버 닫기
    html_source = driver.page_source
    driver.quit()

    return html_source

import os
import sys
import time
from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Add modules in common/functions.py
sys.path.append(os.getcwd())

from common.functions import ChromeDriver

driver = ChromeDriver(headless=False).driver
driver.get("https://www.youtube.com/")
wait = WebDriverWait(driver, 3)

visible = EC.visibility_of_element_located
time.sleep(1)

search = driver.find_element_by_xpath('//input[@id="search"]')
video = 'gracie abrams 21'
search.send_keys(video)
time.sleep(1)

search.send_keys(Keys.ENTER)

driver.get("https://www.youtube.com/results?search_query=" + str(video))

wait.until(visible((By.ID, "video-title")))
driver.find_element_by_id("video-title").click()
time.sleep(3.0)

driver.execute_script("window.scrollTo(0,100);") #document.documentElement.scrollHeight-500
time.sleep(3.0)


html_source = driver.page_source
driver.close()

soup = BeautifulSoup(html_source, 'lxml')

youtube_user_IDs = soup.select('div#header-author > a > span')
youtube_comments = soup.select('yt-formatted-string#content-text')

str_youtube_userIDs = []
str_youtube_comments = []
for i in range(len(youtube_user_IDs)):
    str_tmp = str(youtube_user_IDs[i].text)
    str_tmp = str_tmp.replace('\n', '')
    str_tmp = str_tmp.replace('\t', '')
    str_tmp = str_tmp.replace(' ','')
    str_youtube_userIDs.append(str_tmp)

    str_tmp = str(youtube_comments[i].text)
    str_tmp = str_tmp.replace('\n', '')
    str_tmp = str_tmp.replace('\t', '')
    str_tmp = str_tmp.replace(' ', '')

    str_youtube_comments.append(str_tmp)

for i in range(len(youtube_user_IDs)):
    print(str_youtube_userIDs[i], str_youtube_comments[i])

import pandas as pd

pd_data = {"ID":str_youtube_userIDs, "Comment":str_youtube_comments}
youtube_pd = pd.DataFrame(pd_data)
print(youtube_pd)
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
driver.get("https://www.melon.com/")
wait = WebDriverWait(driver, 3)

visible = EC.visibility_of_element_located
time.sleep(1)

search = driver.find_element_by_xpath('//input[@id="top_search"]')
song = 'gracie abrams 21'
search.send_keys(song)
search.send_keys(Keys.ENTER)
time.sleep(1)
driver.find_element_by_xpath('//*[@id="frm_songList"]/div/table/tbody/tr[1]/td[3]/div/div/a[1]/span').click()
time.sleep(1)
driver.find_element_by_xpath('//*[@id="d_cmtpgn_cmt_count_wrapper"]/ul/li[2]/a').click()

num_of_pagedowns = 1
while num_of_pagedowns:
    driver.execute_script("window.scrollTo(0, document.documentElement.scrollHeight);")
    time.sleep(2.0)
    new_page_height = driver.execute_script("return document.documentElement.scrollHeight")
    num_of_pagedowns -= 1
html_source = driver.page_source

driver.close()

soup = BeautifulSoup(html_source, 'lxml')

melon_user_IDs = soup.select('div.ellipsis > a.thumb.d_cmtpgn_user > span')
melon_comments = soup.select('div.wrap_cntt.d_cmtpgn_cmt_cont_wrapper > div > div')

str_melon_userIDs = []
str_melon_comments = []
for i in range(len(melon_user_IDs)):
    str_tmp = str(melon_user_IDs[i].text)
    str_tmp = str_tmp.replace('\n', '')
    str_tmp = str_tmp.replace('\t', '')
    str_melon_userIDs.append(str_tmp)

for i in range(0,len(melon_comments),2):
    str_tmp = str(melon_comments[i].text)
    str_tmp = str_tmp.replace('\n', '')
    str_tmp = str_tmp.replace('\t', '')
    str_melon_comments.append(str_tmp)

for i in range(len(melon_user_IDs)):
    print(str_melon_userIDs[i], str_melon_comments[i])

pd_data = {"ID":str_melon_userIDs, "Comment":str_melon_comments}
youtube_pd = pd.DataFrame(pd_data)
print(youtube_pd)


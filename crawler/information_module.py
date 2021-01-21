import os
import sys
import time
import pandas as pd
from bs4 import BeautifulSoup
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from common.functions import ChromeDriver

# Add modules in common/functions.py
sys.path.append(os.getcwd())

def find_inforamation(song):
    driver = ChromeDriver(headless=False).driver
    driver.get("https://www.melon.com/")
    wait = WebDriverWait(driver, 3)

    visible = EC.visibility_of_element_located
    time.sleep(1)

    search = driver.find_element_by_xpath('//input[@id="top_search"]')
    search.send_keys(song)
    search.send_keys(Keys.ENTER)
    time.sleep(1)
    driver.find_element_by_xpath('//*[@id="frm_songList"]/div/table/tbody/tr[1]/td[3]/div/div/a[1]/span').click()
    driver.find_element_by_xpath('//*[@id="d_cmtpgn_cmt_count_wrapper"]/ul/li[2]/a').click()

    driver.execute_script("window.scrollTo(0, document.documentElement.scrollHeight);")
    time.sleep(2.0)
    html_source = driver.page_source
    driver.close()

    soup = BeautifulSoup(html_source, 'lxml')
    song_name = soup.select('div.song_name')
    artist = soup.select('div.artist > a.artist_name > span')[0].text
    album = soup.select('div.meta > dl.list > dd > a')[0].text
    release_date = soup.select('div.meta > dl.list > dd')[1].text
    genre = soup.select('div.meta > dl.list > dd')[2].text
    lylic = soup.select('div#d_video_summary')
    # 작사가 작곡가 편곡가 분리... how..?
    artist_name = soup.select('div.section_prdcr > ul.list_person.clfix > li > div.entry > div.ellipsis.artist')

    str_song_name = []
    for i in range(len(song_name)):
        str_tmp = str(song_name[i].text)
        str_tmp = str_tmp.replace('\n', '')
        str_tmp = str_tmp.replace('\t', '')
        str_tmp = str_tmp.replace('곡명', '')
        str_song_name.append(str_tmp)

    str_artist_name = []
    for i in range(len(artist_name)):
        str_tmp = str(artist_name[i].text)
        str_tmp = str_tmp.replace('\n', '')
        str_tmp = str_tmp.replace('\t', '')
        str_artist_name.append(str_tmp)

    str_lylic = []
    for i in range(len(lylic)):
        str_tmp = str(lylic[i].text)
        str_tmp = str_tmp.replace('\n', '')
        str_tmp = str_tmp.replace('\t', '')
        str_lylic.append(str_tmp)

    pd_data = {"SongName":str_song_name, "Artist":artist, "Album":album, "ReleaseDate":release_date, "Genre":genre , "Lylic":str_lylic}
    information_pd = pd.DataFrame(pd_data)

    # data = {"ArtistName":str_artist_name}
    # information = pd.DataFrame(data)

    return information_pd
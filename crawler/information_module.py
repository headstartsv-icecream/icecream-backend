import os
import sys
import pandas as pd
from bs4 import BeautifulSoup
from selenium.webdriver.common.keys import Keys
from common.functions import ChromeDriver

# Add modules in common/functions.py
sys.path.append(os.getcwd())

def search_word(title,singer):
    return singer+'+'+title.replace(' ','+')

def find_inforamation(title, singer):
    driver = ChromeDriver(headless=False).driver
    
    driver.get("https://www.melon.com/search/total/index.htm?q=" + str(search_word(title, singer)))

    driver.find_element_by_xpath('//*[@id="divCollection"]/ul/li[3]/a/span').click()  # 검색 항목에서 '곡'으로 바꿈

    # 곡이 없으면 가수 이름으로 재검색
    try:
        driver.find_element_by_xpath(
            '//*[@id="frm_defaultList"]/div/table/tbody/tr/td[3]/div/div/a[1]/span').click()  # 첫 번째 곡 정보 선택
    except:
        driver.get("https://www.melon.com/search/total/index.htm?q=" + str(singer.replace(' ', '+')))
        driver.find_element_by_xpath('//*[@id="divCollection"]/ul/li[3]/a/span').click()  # 검색 항목에서 '곡'으로 바꿈
        html_source = driver.page_source
        soup = BeautifulSoup(html_source, 'lxml')
        for i in range(1, 50):
            song_name = soup.select_one(
                '#frm_defaultList > div > table > tbody > tr:nth-child(%d) > td:nth-child(3) > div > div > a.fc_gray' % i).get_text()
            if (title in song_name):
                driver.find_element_by_xpath(
                    '//*[@id="frm_defaultList"]/div/table/tbody/tr[%d]/td[3]/div/div/a[1]/span' % i).click()
                break

    driver.execute_script("window.scrollTo(0, document.documentElement.scrollHeight);")
    html_source = driver.page_source
    driver.close()

    soup = BeautifulSoup(html_source, 'lxml')
    image = soup.select('div.wrap_info > div.thumb > a.image_typeAll > img')
    song_name = soup.select('div.song_name')
    artist = singer.replace(' & ',', ')
    album = soup.select('div.meta > dl.list > dd > a')[0].text
    release_date = soup.select('div.meta > dl.list > dd')[1].text
    genre = soup.select('div.meta > dl.list > dd')[2].text
    lylic = soup.select('div#d_video_summary')
    artist_name = soup.select('div.section_prdcr > ul.list_person.clfix > li > div.entry')

    image_url = []
    for i in image:
        image_url.append(i.get('src'))

    str_artist_name = []
    for i in range(len(artist_name)):
        str_tmp = str(artist_name[i].text)
        str_tmp = str_tmp.replace('\n', ' ')
        str_tmp = str_tmp.replace('\t', '')
        str_artist_name.append(str_tmp)
    str_artist_name = ",".join(str_artist_name)

    str_lylic = []
    for i in range(len(lylic)):
        str_tmp = str(lylic[i])
        str_tmp = str_tmp.replace('<div class="lyric" id="d_video_summary"><!-- height:auto; 로 변경시, 확장됨 -->', '')
        str_tmp = str_tmp.strip('</div>')
        str_tmp = str_tmp.strip()
        str_tmp = str_tmp.strip('<br/>')
        str_tmp = str_tmp.replace('\t', '')
        str_lylic.append(str_tmp)

    print("정보 가져옴")

    pd_data = {"albumImage": image_url, "title": title, "artist": singer, "Album": album, "ReleaseDate": release_date, "Genre": genre,
               "lyric": str_lylic, "artistName": str_artist_name}
    information_pd = pd.DataFrame(pd_data)

    return information_pd
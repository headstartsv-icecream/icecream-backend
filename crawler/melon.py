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

driver = ChromeDriver().driver
driver.get("https://www.melon.com/")



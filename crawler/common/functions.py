import time
from selenium import webdriver


class ChromeDriver:
    def __init__(self, wait_sec=10, headless=True):
        # Setting chrome options
        print("Initialize the chrome webdriver...")
        options = webdriver.ChromeOptions()

        if headless:
            options.add_argument("headless")
            options.add_argument("disable-gpu")

        # options.add_argument("no-sandbox") 왜 주석?
        options.add_argument("disable-dev-shm-usage")
        options.add_argument("window-size=1920x1080")
        options.add_argument(
            "user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36"
        )
        options.add_argument("lang=ko_KR")
        options.add_argument("log-level=2")
        prefs = {
            "profile.default_content_setting_values": {
                "cookies": 1,
                "images": 2,
                "plugins": 2,
                "popups": 2,
                "geolocation": 2,
                "notifications": 2,
                "auto_select_certificate": 2,
                "fullscreen": 2,
                "mouselock": 2,
                "mixed_script": 2,
                "media_stream": 2,
                "media_stream_mic": 2,
                "media_stream_camera": 2,
                "protocol_handlers": 2,
                "ppapi_broker": 2,
                "automatic_downloads": 2,
                "midi_sysex": 2,
                "push_messaging": 2,
                "ssl_cert_decisions": 2,
                "metro_switch_to_desktop": 2,
                "protected_media_identifier": 2,
                "app_banner": 2,
                "site_engagement": 2,
                "durable_storage": 2,
            }
        }
        options.add_experimental_option("prefs", prefs)

        # Initialize chrome driver
        self.driver = webdriver.Chrome("./chromedriver", options=options)
        self.driver.implicitly_wait(wait_sec)
        self.driver.execute_script(
            "Object.defineProperty(navigator, 'plugins', {get: function() {return[1, 2, 3, 4, 5]}})"
        )
        self.driver.execute_script(
            "Object.defineProperty(navigator, 'languages', {get: function() {return ['ko-KR', 'ko']}})"
        )
        self.driver.execute_script(
            "const getParameter = WebGLRenderingContext.getParameter;WebGLRenderingContext.prototype.getParameter = function(parameter) {if (parameter === 37445) {return 'NVIDIA Corporation'} if (parameter === 37446) {return 'NVIDIA GeForce GTX 980 Ti OpenGL Engine';}return getParameter(parameter);};"
        )

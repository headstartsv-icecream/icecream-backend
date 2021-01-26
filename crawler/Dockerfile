FROM ubuntu:20.04

ENV TZ=Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt update -y && \
	apt install -y python3-pip python3-dev wget
	
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
	echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list && \
	apt update -y && \
	apt install -y  google-chrome-stable
		
RUN apt install -yqq unzip curl && \
	wget -O /tmp/chromedriver.zip http://chromedriver.storage.googleapis.com/`curl -sS chromedriver.storage.googleapis.com/LATEST_RELEASE`/chromedriver_linux64.zip && \
	unzip /tmp/chromedriver.zip chromedriver -d /app/

COPY ./crawler/requirements.txt /app/requirements.txt

WORKDIR /app

RUN python3 -m pip install -r requirements.txt

COPY ./crawler /app

EXPOSE 5000

ENTRYPOINT [ "python3" ]

CMD [ "crawler.py" ]

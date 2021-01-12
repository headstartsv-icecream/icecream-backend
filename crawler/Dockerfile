FROM ubuntu:20.04

RUN apt update -y && \
	apt install -y python3-pip python3-dev

COPY ./crawler/requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip3 install -r requirements.txt

COPY ./crawler /app

EXPOSE 5000

ENTRYPOINT [ "python3" ]

CMD [ "youtube.py" ]

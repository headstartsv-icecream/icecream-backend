FROM node:15.5

COPY ./package*.json /app/

WORKDIR /app

COPY . /app

RUN yarn && yarn build

EXPOSE 4000

ENTRYPOINT [ "yarn" ]

CMD [ "start" ]

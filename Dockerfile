FROM node:15.5

RUN mkdir /app
WORKDIR /app

COPY ./package.json ./yarn.lock /app/
COPY ./dist /app/dist

RUN yarn install --production

EXPOSE 4000

ENTRYPOINT [ "yarn" ]

CMD [ "start" ]

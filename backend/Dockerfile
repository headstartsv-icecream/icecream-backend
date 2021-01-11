FROM node:14-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY ["./package.json", "./yarn.lock", "./"]
COPY "./dist" "./dist"

RUN yarn install --production

EXPOSE 4000

ENTRYPOINT [ "yarn" ]

CMD [ "start" ]

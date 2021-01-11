FROM node:14-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY ["./backend/package.json", "./backend/yarn.lock", "./"]
COPY "./backend/dist" "./dist"

RUN yarn install --production

EXPOSE 4000

ENTRYPOINT [ "yarn" ]

CMD [ "start" ]

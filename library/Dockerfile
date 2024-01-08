FROM node:18 as builder

ARG env

WORKDIR /build

COPY ./frontend/ .

COPY ${env} .

RUN cat ${env} >> .env

RUN cat .env

RUN yarn && yarn build

FROM node:18

WORKDIR /app

COPY ./backend/ .

RUN yarn

COPY --from=builder /build/dist ./frontend/dist

CMD ["yarn", "start"]

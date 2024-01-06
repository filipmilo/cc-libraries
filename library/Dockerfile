FROM node:18 as builder

WORKDIR /build

COPY ./frontend/ .

RUN yarn && yarn build

FROM node:18

WORKDIR /app

COPY ./backend/ .

RUN yarn

COPY --from=builder /build/dist ./frontend/dist

CMD ["yarn", "start"]

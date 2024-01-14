FROM node:18 as builder

ARG VITE_LIBRARY
ARG VITE_ENDPOINT

ENV VITE_LIBRARY=$VITE_LIBRARY
ENV VITE_ENDPOINT=$VITE_ENDPOINT

WORKDIR /build

COPY ./frontend/ .

RUN yarn && yarn build

FROM node:18

WORKDIR /app

COPY ./backend/ .

RUN yarn

COPY --from=builder /build/dist ./frontend/dist

CMD ["yarn", "start"]

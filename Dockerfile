FROM node:10.19.0-alpine as node

WORKDIR /app

ADD ./package.json ./

RUN npm config set unsafe-perm true

# RUN npm i npm@latest -g
COPY . .

RUN npm i
RUN npm run build

RUN ls build


FROM nginx:1.13.12-alpine

COPY --from=node /app/build /usr/share/nginx/html
RUN apk update

RUN ls /usr/share/nginx/html

RUN apk add ca-certificates wget && wget https://gist.githubusercontent.com/ratulbasak/5530bcfb208d6027a6dea0ab5504898c/raw/e6e9c1944dc5e83001eff04545f88980aa9abeb4/nginx.conf -O /etc/nginx/conf.d/default.conf && rm -rf /var/cache/apk/*

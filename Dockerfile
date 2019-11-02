FROM node:alpine

RUN apk update && apk add ca-certificates openssl && update-ca-certificates

RUN mkdir /kiana
ADD . /kiana
WORKDIR /kiana

RUN npm install
CMD [ "npm", "start" ]
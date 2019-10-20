FROM golang:1.8

WORKDIR /go/src/app
COPY /server .

RUN go get -d -u github.com/gorilla/mux
RUN go get -d -u go.mongodb.org/mongo-driver/mongo

COPY /server/main.go .

# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /client
COPY /client .

# add `/app/node_modules/.bin` to $PATH
ENV PATH /client/node_modules/.bin:$PATH

# install and cache app dependencies
COPY client/package.json ./
RUN npm install --silent

# start app
EXPOSE 3000
CMD ["npm", "start"]

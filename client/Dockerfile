# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /client
COPY / .

# add `/app/node_modules/.bin` to $PATH
ENV PATH /node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json .
RUN npm install --silent

RUN npm rebuild node-sass

# build and run app
RUN npm run build

# EXPOSE 3000
CMD ["npm", "start"]

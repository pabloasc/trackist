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

# build and run app
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]

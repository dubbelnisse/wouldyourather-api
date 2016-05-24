FROM node:4

ADD package.json /app/

WORKDIR /app

RUN npm install

ADD ./lib /app/lib
ADD ./migrations /app/migrations
ADD ./database.json /app/database.json

EXPOSE 3000
CMD npm run migrate && npm start

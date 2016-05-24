FROM node:4.2

RUN npm install -g rethink-migrate

ADD package.json /app/

WORKDIR /app

RUN npm install

ADD ./lib /app/lib
ADD ./migrations /app/migrations
ADD ./database.json /app/database.json

EXPOSE 3000
CMD npm run migrate && npm start

FROM node:12.18.3

RUN npm config set registry https://registry.npm.taobao.org

ENV FRONTEND=/opt/frontend

WORKDIR $FRONTEND

COPY package.json $FRONTEND
COPY package-lock.json $FRONTEND
RUN npm install

COPY . $FRONTEND
RUN npm run build


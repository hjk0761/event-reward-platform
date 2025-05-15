FROM node:18

RUN mkdir -p /var/app
WORKDIR /var/app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

CMD ["node", "dist/main"]

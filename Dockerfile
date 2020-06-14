FROM node:10 AS builder

WORKDIR /usr/src/app

COPY ./package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:10-alpine
WORKDIR /app
COPY --from=builder /usr/src/app ./

EXPOSE 3000

CMD [ "node", "dist/main.js"]

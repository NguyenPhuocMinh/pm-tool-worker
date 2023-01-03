FROM node:lts-alpine3.15 AS developement

# Create directory containing source code
WORKDIR /usr/src/app
# Coppy to folder create
COPY package*.json ./
# Run install dependencies
RUN npm install

ENV APP_PORT=8081
ENV APP_HOST=0.0.0.0
ENV NODE_ENV=dev
ENV APP_RABBIT_URI=amqp://localhost

COPY . .

FROM node:lts-alpine3.15 AS production

WORKDIR /usr/src/app

COPY package*.json ./

ENV APP_PORT=8081
ENV APP_HOST=0.0.0.0
ENV NODE_ENV=production

RUN npm install --only=production

COPY . .

COPY --from=developement /usr/src/app/ ./

CMD [ "node", "server" ]
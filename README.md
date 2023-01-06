## Dev

- [Dev](#dev)
- [Setup env](#setup-env)
- [Clone](#clone)
- [Install](#install)
- [Ex .env](#ex-env)
- [Run](#run)
- [Docker](#docker)
- [RabbitMQ](#rabbitmq)
- [Build](#build)
- [Circle CI/CD](#circle-cicd)
- [Server testing vercel app](#server-testing-vercel-app)

---

## Setup env

- **Setup Eslint extension**
- **Setup prettier extension**
- **Setup redis cli**
- **Setup docker**
- **Setup CircleCI**

## Clone

```sh
$ git clone https://github.com/NguyenPhuocMinh/pm-tool-worker.git
```

## Install

```sh
$ npm install
```

## Ex .env

- APP_PORT=8081
- APP_HOST=0.0.0.0
- APP_MONGO_URI=mongodb://127.0.0.1:27017/pm-tool
- APP_REDIS_URI=redis://localhost:6379
- APP_RABBIT_URI=amqp://localhost ## 5672

## Run

- **Start local**

```sh
$ npm run dev
```

or

```sh
$ node server.js
```

- **Check Linter**

```sh
$ npm run lint:check
```

## Docker

- **Run build docker images**

```sh
$ docker build -t <username>/pm-tool-worker:<version> .
```

- **Run build docker images**

```sh
$ docker run -d -p 8081:8081 pm-tool-worker
```

## RabbitMQ

- **Run RabbitMQ local docker images**

```sh
$ docker run -d -p 5672:5672 rabbitmq
```

- **Run RabbitMQ Management**

```sh
$ $ docker run -d --hostname my-rabbit --name some-rabbit -p 8080:15672 rabbitmq:3-management
```

- [Login management with guest / guest](https://localhost:8080)

## Build

- **When merge master so remember**:
  - **Step 1** => go to file config.yml in folder .circleci change APP_DOCKER_TAG and APP_HELM_TAG new version
  - **Step 2** => go to file values.yaml in folder /charts/pm-tool-api change new version docker tag
  - **Step 3** => go to file Chart.yaml in folder /charts/pm-tool-api change new version chart
  - **Step 4** => go to file profiles.js in folder /src/conf change new version

## Circle CI/CD

- **Environment variables**

  - APP_DEPLOYED_USER
  - APP_HOST_NAME
  - APP_DOCKER_IMAGE
  - APP_REPO_URL
  - APP_SSH_FINGERPRINT

- **Context variables**

  - APP_AWS_ACCESS_KEY
  - APP_AWS_ACCOUNT_ID
  - APP_AWS_REGION
  - APP_AWS_SECRET_KEY
  - APP_DOCKER_PASSWORD
  - APP_DOCKER_USERNAME
  - APP_GITHUB_TOKEN

## Server testing vercel app

- [Vercel App](https://pm-tool-worker.vercel.app/)

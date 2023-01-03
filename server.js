'use strict';

import http from 'http';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import favicon from 'serve-favicon';
import path from 'path';
import { fileURLToPath } from 'url';

// configs
import profiles from './src/configs/profiles.js';
import constants from './src/constants/index.js';
// middleware
import logMiddleware from './src/middleware/log-middleware.js';
// services
import amqpServices from './src/services/amqp.js';
// workers
import workers from './src/workers/index.js';
// core
import loggerManager from './src/core/logger.js';

const logger = loggerManager();

const APP_PORT = profiles.APP_PORT;
const APP_HOST = profiles.APP_HOST;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

const main = async () => {
  app.use(cors());
  app.use(helmet());
  app.use(morgan(logMiddleware));
  app.use(favicon(path.resolve(__dirname, './src/public', 'favicon.ico')));

  /**
   * Rabbit MQ
   */
  await amqpServices.Init();

  /**
   * Subscriber
   */
  await amqpServices.subscriber(
    constants.AMQP_QUEUES.SEND_NOTIFY_CHANGE_PASSWORD_QUEUE,
    workers.handleSendMailChangePassword,
    true
  );

  server.listen(APP_PORT, APP_HOST, () => {
    const port = server.address().port;
    const host = server.address().address;

    logger.log({
      level: constants.LOG_LEVELS.INFO,
      message: `The server is running on`,
      args: `[${host}:${port}]`
    });
  });
};

main().catch((err) => {
  logger.log({
    level: constants.LOG_LEVELS.ERROR,
    message: 'The server has been error',
    err
  });
});

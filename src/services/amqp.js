'use strict';

import amqp from 'amqplib';
import retry from 'retry';
// configs
import options from '../configs/options.js';
import profiles from '../configs/profiles.js';
import constants from '../constants/index.js';
// core
import loggerManager from '../core/logger.js';

const logger = loggerManager();

const APP_RABBIT_URI = profiles.APP_RABBIT_URI;

let conn;
let channel;

/**
 * @description Init RabbitMQ
 */
const Init = async () => {
  try {
    conn = await amqp.connect(APP_RABBIT_URI + '?heartbeat=60');
    channel = await conn.createChannel();

    logger.log({
      level: constants.LOG_LEVELS.INFO,
      message: `The RabbitMQ is running on ${APP_RABBIT_URI}`
    });
  } catch (err) {
    logger.log({
      level: constants.LOG_LEVELS.ERROR,
      message: 'Func subscriber has error',
      args: {
        errName: err.name,
        errMsg: err.message
      }
    });

    const operation = retry.operation(options.retryOptions);
    operation.attempt((current) => {
      if (operation.retry(err)) {
        logger.log({
          level: constants.LOG_LEVELS.ERROR,
          message: `Unable to connect to the RabbitMQ. Retrying(${current})`,
          args: {
            errName: err.name,
            errMsg: err.message
          }
        });
        if (current > options.retryOptions.retries) {
          process.exit(0);
        }
        return err;
      }
    });
    throw err;
  }
};

const subscriber = async (queueName, workersHandleMsg, autoAck = true) => {
  try {
    logger.log({
      level: constants.LOG_LEVELS.INFO,
      message: 'Func subscriber has been start'
    });

    await channel.assertQueue(queueName, {
      durable: false
    });

    logger.log({
      level: constants.LOG_LEVELS.INFO,
      message: '[*] Waiting for messages in queue',
      queueName
    });

    await channel.consume(
      queueName,
      async (msg) => {
        logger.log({
          level: constants.LOG_LEVELS.INFO,
          message: '[x] subscriber has been received message',
          msg: `${msg.content.toString()}`
        });
        await workersHandleMsg(msg);

        // channel.ack(msg);
      },
      { noAck: autoAck }
    );
  } catch (err) {
    logger.log({
      level: constants.LOG_LEVELS.ERROR,
      message: 'Func subscriber has error',
      args: {
        errName: err.name,
        errMsg: err.message
      }
    });
    throw err;
  }
};

const amqpServices = {
  Init,
  subscriber
};

export default amqpServices;

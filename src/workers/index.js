'use strict';

import constants from '../constants/index.js';
// core
import loggerManager from '../core/logger.js';

const logger = loggerManager();

const handleTest = async (msg) => {
  try {
    logger.log({
      level: constants.LOG_LEVELS.INFO,
      message: 'Func handleTest has been start'
    });
    const parseData = JSON.parse(msg.content.toString());
    logger.log({
      level: constants.LOG_LEVELS.INFO,
      message: '[x] handleTest received data',
      args: parseData
    });
  } catch (err) {
    console.error(err);
    logger.log({
      level: constants.LOG_LEVELS.ERROR,
      message: 'Func handleTest has been error',
      args: {
        errName: err.name,
        errMsg: err.message
      }
    });
    throw err;
  }
};

const handleSendMailChangePassword = async (msg) => {
  try {
    logger.log({
      level: constants.LOG_LEVELS.INFO,
      message: 'Func handleSendMailChangePassword has been start'
    });
    const parseData = JSON.parse(msg.content.toString());
    logger.log({
      level: constants.LOG_LEVELS.INFO,
      message: '[x] handleSendMailChangePassword received data',
      args: parseData
    });

    logger.log({
      level: constants.LOG_LEVELS.INFO,
      message: 'Func handleSendMailChangePassword has been end'
    });
  } catch (err) {
    console.error(err);
    logger.log({
      level: constants.LOG_LEVELS.ERROR,
      message: 'Func handleSendMailChangePassword has been error',
      args: {
        errName: err.name,
        errMsg: err.message
      }
    });
    throw err;
  }
};

const workers = {
  handleTest,
  handleSendMailChangePassword
};

export default workers;

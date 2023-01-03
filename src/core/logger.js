'use strict';

import winston from 'winston';
import constants from '../constants/index.js';

const loggerManager = () => {
  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: constants.APP_NAME },
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' })
    ]
  });
  return logger;
};

export default loggerManager;

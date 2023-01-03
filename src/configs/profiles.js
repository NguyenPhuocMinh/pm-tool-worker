'use strict';

import dotenv from 'dotenv';

dotenv.config();

const profiles = {
  VERSION: 'v1.0.0',
  APP_ENV: process.env.NODE_ENV || 'dev',
  APP_PORT: process.env.APP_PORT || 8081,
  APP_HOST: process.env.APP_HOST || '0.0.0.0',
  APP_RABBIT_URI: process.env.APP_RABBIT_URI
};

export default profiles;

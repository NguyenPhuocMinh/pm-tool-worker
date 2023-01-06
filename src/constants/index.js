'use strict';

const APP_NAME = 'pm-tool-worker';

const HTTP_STATUS = {
  SUCCESS: '200',
  CREATED: '201',
  ACCEPTED: '202',
  BAD_REQUEST: '400',
  UN_AUTHORIZATION: '401',
  FORBIDDEN: '403',
  NOT_FOUND: '404',
  METHOD_NOT_ALLOW: '405',
  DUPLICATE: '409',
  INTERNAL_SERVER_ERROR: '500'
};

const LOG_LEVELS = {
  ERROR: 'error',
  INFO: 'info'
};

/**
 * @description QUEUE
 */
const AMQP_QUEUES = {
  TEST_QUEUE: 'TEST_QUEUE',
  SEND_NOTIFY_CHANGE_PASSWORD_QUEUE: 'SEND_NOTIFY_CHANGE_PASSWORD_QUEUE'
};

const constants = {
  APP_NAME,
  HTTP_STATUS,
  LOG_LEVELS,
  AMQP_QUEUES
};

export default constants;

'use strict';

import constants from '../constants/index.js';
import loggerManager from '../core/logger.js';

const loggerFactory = loggerManager();

const loggerMiddleware = (tokens, req, res) => {
  const remoteAddr = tokens['remote-addr'](req);
  const remoteUser = tokens['remote-user'](req) || '-';
  const dateClf = tokens.date(req, res, 'clf');
  const method = tokens.method(req, res);
  const url = tokens.url(req, res);
  const protocol = req.protocol;
  const httpVersion = tokens['http-version'](req);
  const status = tokens.status(req, res) || '-';
  const contentLength = tokens.res(req, res, 'content-length') || '-';
  const resTime = tokens['response-time'](req, res) || '-';
  const referrer = tokens.referrer(req) || '-';
  const userAgent = tokens['user-agent'](req) || '-';

  const messageLog = `${remoteAddr} - ${remoteUser} [${dateClf}] "${method} ${url} ${protocol}/${httpVersion}" ${status} ${contentLength} "${referrer}" "${userAgent}" - ${resTime} ms`;

  switch (status) {
    case constants.HTTP_STATUS.BAD_REQUEST:
    case constants.HTTP_STATUS.UN_AUTHORIZATION:
    case constants.HTTP_STATUS.FORBIDDEN:
    case constants.HTTP_STATUS.NOT_FOUND:
      loggerFactory.warn(messageLog);
      break;
    case constants.HTTP_STATUS.INTERNAL_SERVER_ERROR:
      loggerFactory.error(messageLog);
      break;
    case constants.HTTP_STATUS.SUCCESS:
    case constants.HTTP_STATUS.CREATED:
    case constants.HTTP_STATUS.ACCEPTED:
      loggerFactory.info(messageLog);
      break;
    case constants.HTTP_STATUS.METHOD_NOT_ALLOW:
      loggerFactory.verbose(messageLog);
      break;
    case constants.HTTP_STATUS.DUPLICATE:
      loggerFactory.debug(messageLog);
      break;
    default:
      loggerFactory.silly(messageLog);
      break;
  }
};

export default loggerMiddleware;

'use strict';

import constants from '../constants/index.js';
// core
import loggerManager from '../core/logger.js';

const logger = loggerManager();

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
    // const source = fs.readFileSync(
    //   path.join(__dirname, '../../public', '/templates/mail-payment.html'),
    //   'utf8'
    // );
    // const template = handlebars.compile(source);

    // const mailOptions = {
    //   from: `"SYSTEM" <${profiles.emailContact}>`,
    //   to: `${customerEmail}`,
    //   to: 'minhnguyen96.dn@gmail.com',
    //   subject: 'CN ADMIN - PAYMENT SUCCESS MESSAGE',
    //   html: template({
    //     receiptURL: receiptURL,
    //     emailContact: profiles.emailContact
    //   })
    // };
    // await mailer.SendMailMessage(mailOptions);
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
  handleSendMailChangePassword
};

export default workers;

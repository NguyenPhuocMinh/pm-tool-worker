'use strict';

// core
import loggerManager from '../core/logger.js';

const loggerFactory = loggerManager();

const handleSendMailChangePassword = async (msg) => {
  try {
    loggerFactory.info(`Func handleSendMailChangePassword has been start`);
    const parseData = JSON.parse(msg.content.toString());
    console.log(
      '🚀 ~ file: index.js:11 ~ handleWorkerSendMailPayment ~ parseData',
      parseData
    );
    const { customerEmail, receiptURL } = parseData;

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
    loggerFactory.info(`Func handleSendMailChangePassword has been end`);
  } catch (err) {
    console.error(err);
    loggerFactory.error(`Func handleSendMailChangePassword has error`, {
      args: err.message
    });
    throw err;
  }
};

const workers = {
  handleSendMailChangePassword
};

export default workers;

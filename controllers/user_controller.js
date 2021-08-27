const nodemailer = require('nodemailer');
var config = require('../config');


const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
          user: config.EMAIL_USERNAME,
          pass: config.EMAIL_PASSWORD,
      },
});
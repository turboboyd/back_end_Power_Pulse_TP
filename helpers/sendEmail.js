const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: "denisdaniv1@outlook.com",
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  await transport.sendMail({
    ...data,
    from: "denisdaniv1@outlook.com",
  });
};

module.exports = sendEmail;

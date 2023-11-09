import nodemailer from 'nodemailer';
import 'dotenv/config';

const { GMAIL_PASSWORD, GMAIL_EMAIL } = process.env;

const nodemailerConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: GMAIL_EMAIL,
        pass: GMAIL_PASSWORD
    }
}

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
    const email = { ...data, from: GMAIL_EMAIL };
    try {
        await transport.sendMail(email);
        return true;
    }
    catch (error) {
        console.error(error.message);
        return false;
    }
}

export default sendEmail;
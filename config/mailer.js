const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');

let transporter;
const initTransporter = () => {
    transporter = nodemailer.createTransport(
        nodemailerSendgrid({
            apiKey: process.env.SENDGRID_API_KEY
        })
    );
};

const getTransporter = () => {
    return transporter;
};

module.exports = {
    initTransporter,
    getTransporter,
};
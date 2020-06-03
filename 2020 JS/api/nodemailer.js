const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(
    {
        host: 'ex20.atservers.net',
        port: 587,
        secure: false,
        auth: {
            user: 'kinoteatr.salyut@gsr.by',
            pass: 'Bel2020+-+',
        },
    },
    {
        from: 'Кинотеатр Салют <kinoteatr.salyut@gsr.by>',
    }
);

const mailer = (message) => {
    transporter.sendMail(message, (err, info) => {
        if (err) return console.log(err);
        console.log('Email sent: ', info);
    });
};

module.exports = mailer;

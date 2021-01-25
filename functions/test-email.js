const mailgun = require('mailgun-js');
require('dotenv').config();

exports.handler = function (event, context, callback) {
    const mg = mailgun({
        apiKey: MAILGUN_API_KEY,
        domain: MAILGUN_DOMAIN,
    });

    const data = {
        from: 'Logistics Director <logistics@enginclub.com>',
        to: 'hellosamchris@gmail.com',
        subject: 'SUBJECT',
        text: 'TEXT',
        html: 'HTML'
    };

    mg.messages().send(data, (error, body) => {
        if (error) {
            return console.log(error);
        }

        callback(null, {
            statusCode: 200,
            body: "Mail sent"
        });
    });
}
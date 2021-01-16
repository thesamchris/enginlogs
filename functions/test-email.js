const mailgun = require('mailgun-js');

exports.handler = function (event, context, callback) {
    const mg = mailgun({
        apiKey: "2ca12afb8ce22c2f5506541de796ed16-28d78af2-dfe0b8f6",
        domain: "enginclub.com"
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
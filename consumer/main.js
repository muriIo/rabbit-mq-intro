var amqp = require('amqplib/callback_api');

amqp.connect('amqp://guest:guest@localhost:5672', function (error0, connection) {
    if (error0)
        throw error0;

    connection.createChannel(function (error1, channel) {
        if (error1)
            throw error1;

        var queue = 'hello-world';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function (msg) {

            if (msg) {
                const content = msg.content.toString();

                console.log(" [x] Received %s", content);

                if (content == "CLOSE") {
                    channel.deleteQueue(queue);
                    channel.close();
                    process.exit(0);
                }
            }
        }, {
            noAck: true,
        });
    });
});
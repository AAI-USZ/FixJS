function (callback) {
                var smtp_client = new SMTPClient(port, host, timeout);
                logger.logdebug('[smtp_client_pool] ' + smtp_client.uuid + ' created');
                callback(null, smtp_client);
            }
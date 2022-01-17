function (callback) {
                var smtp_client = new SMTPClient(port, host, timeout, enable_tls);
                logger.logdebug('[smtp_client_pool] ' + smtp_client.uuid + ' created');
                callback(null, smtp_client);
            }
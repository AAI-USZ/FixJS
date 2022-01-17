function (plugin, connection, config, callback) {
    var enable_tls = /(true|yes|1)/i.exec(config.main.enable_tls) != null;
    var pool = exports.get_pool(connection.server, config.main.port,
        config.main.host, config.main.timeout, config.main.max_connections);
    pool.acquire(function (err, smtp_client) {
        connection.logdebug(plugin, 'Got smtp_client: ' + smtp_client.uuid);
        smtp_client.call_next = function (retval, msg) {
            if (this.next) {
                var next = this.next;
                delete this.next;
                next(retval, msg);
            }
        };

        smtp_client.on('client_protocol', function (line) {
            connection.logprotocol(plugin, 'C: ' + line);
        });

        smtp_client.on('server_protocol', function (line) {
            connection.logprotocol(plugin, 'S: ' + line);
        });

        var helo = function (command) {
            if (smtp_client.xclient) {
                smtp_client.send_command(command, connection.hello_host);
            }
            else {
                smtp_client.send_command(command, plugin.config.get('me'));
            }
        };
        smtp_client.on('greeting', helo);
        smtp_client.on('xclient', helo);

        smtp_client.on('capabilities', function () {
            for (var line in smtp_client.response) {
                if (smtp_client.response[line].match(/^XCLIENT/)) {
                    if(!smtp_client.xclient) {
                        smtp_client.send_command('XCLIENT',
                            'ADDR=' + connection.remote_ip);
                        return;
                    }
                }
                if (smtp_client.response[line].match(/^STARTTLS/)) {
                    var key = plugin.config.get('tls_key.pem', 'data').join("\n");
                    var cert = plugin.config.get('tls_cert.pem', 'data').join("\n");
                    if (key && cert && enable_tls) {
                        smtp_client.socket.on('secure', function () {
                            smtp_client.emit('greeting', 'EHLO');
                        });
                        smtp_client.send_command('STARTTLS');
                        return;
                    }
                }
            }
        });

        smtp_client.on('helo', function () {
            smtp_client.send_command('MAIL',
                'FROM:' + connection.transaction.mail_from);
        });

        smtp_client.on('error', function (msg) {
            connection.logwarn(plugin, msg);
            smtp_client.call_next();
        });

        if (smtp_client.connected) {
            if (smtp_client.xclient) {
                smtp_client.send_command('XCLIENT',
                    'ADDR=' + connection.remote_ip);
            }
            else {
                smtp_client.emit('helo');
            }
        }

        callback(err, smtp_client);
    });
}
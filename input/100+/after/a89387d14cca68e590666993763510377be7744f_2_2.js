function (server, port, host, timeout, max) {
    var port = port || 25;
    var host = host || 'localhost';
    var timeout = (timeout == undefined) ? 300 : timeout;
    var name = port + ':' + host + ':' + timeout;
    if (!server.notes.pool) {
        server.notes.pool = {};
    }
    if (!server.notes.pool[name]) {
        var pool = generic_pool.Pool({
            name: name,
            create: function (callback) {
                var smtp_client = new SMTPClient(port, host, timeout);
                logger.logdebug('[smtp_client_pool] ' + smtp_client.uuid + ' created');
                callback(null, smtp_client);
            },
            destroy: function(smtp_client) {
                logger.logdebug('[smtp_client_pool] ' + smtp_client.uuid + ' destroyed, state=' + smtp_client.state);
                smtp_client.state = STATE_DESTROYED;
                smtp_client.socket.destroy();
            },
            max: max || 1000,
            idleTimeoutMillis: timeout * 1000,
            log: function (str, level) {
                level = (level == 'verbose') ? 'debug' : level;
                logger['log' + level]('[smtp_client_pool] ' + str);
            }
        });

        var acquire = pool.acquire;
        pool.acquire = function (callback, priority) {
            var callback_wrapper = function (err, smtp_client) {
                smtp_client.pool = pool;
                if (smtp_client.state == STATE_DEAD) {
                    smtp_client.destroy();
                    pool.acquire(callback, priority);
                    return;
                }
                smtp_client.state = STATE_ACTIVE;
                callback(err, smtp_client);
            };
            acquire.call(pool, callback_wrapper, priority);
        };
        server.notes.pool[name] = pool;
    }
    return server.notes.pool[name];
}
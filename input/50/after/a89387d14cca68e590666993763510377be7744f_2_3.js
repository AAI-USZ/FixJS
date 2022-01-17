function (msg) {
            connection.logwarn(plugin, msg);
            smtp_client.call_next();
        }
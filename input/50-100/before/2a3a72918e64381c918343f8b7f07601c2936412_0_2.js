function() {
        var client = new varnish.VarnishClient('127.0.0.1', server.address().port);
        client.on('ready', function() {
            client.on('close', function() { ok = true; });
            server.close_connections();
            server.close();
        });
    }
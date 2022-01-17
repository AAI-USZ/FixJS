function() {
        var client = new varnish.VarnishClient('127.0.0.1', server.address().port);
        client.on('ready', function() {
            client.run_cmd('purge obj.http.X == test', function(){});
        });
    }
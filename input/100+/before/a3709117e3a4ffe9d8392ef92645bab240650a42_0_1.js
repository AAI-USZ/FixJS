function(done) {
        var ok = false;
        var server = VarnishEmu();
        server.on('listening', function() {
            var client = new varnish.VarnishClient('127.0.0.1', server.address().port);
            client.on('ready', function() {
                client.on('close', function() { ok = true; });
                server.close_connections();
                server.close();
            });
        });
        setTimeout(function() { assert.ok(ok); done(); }, 300);
    }
function(done) {
        var ok = false;
        var server = new VarnishEmu();
        server.on('listening', function() {
            var client = new varnish.VarnishClient('127.0.0.1', server.address().port);
            client.on('connect', function() {
                ok = true;
            });
        });
        setTimeout(function() { assert.ok(ok); 
            server.close();
            done();
        }, 200);
    }
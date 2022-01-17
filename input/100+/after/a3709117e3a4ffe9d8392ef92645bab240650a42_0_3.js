function(done) {
        var ok = false;
        var server = new VarnishEmu()
        server.on('listening', function() {
            var client = new varnish.VarnishClient('127.0.0.1', server.address().port);
            client.on('ready', function() {
                client.run_cmd('purge obj.http.X == test', function(){});
                client.on('error', function(e) {
                    ok = true;
                    assert.equal('RESPONSE_PENDING', e.code);
                });
                client.run_cmd('purge obj.http.X == test', function(){});
            });
        });
        setTimeout(function() { assert.ok(ok); done(); }, 100);
    }
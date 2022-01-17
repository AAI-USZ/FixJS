function(done) {
        var command_to_send = 'a command';
        var server = new VarnishEmu(function(cmd) {
            assert.equal(cmd, command_to_send + '\n');
            done();
        });
        server.on('listening', function() {
            var client = new varnish.VarnishClient('127.0.0.1', server.address().port);
            client.on('ready', function() {
                client.run_cmd(command_to_send);
            });
        });
    }
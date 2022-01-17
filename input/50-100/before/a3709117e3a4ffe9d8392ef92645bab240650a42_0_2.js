function(done) {
        var server = VarnishEmu()
        server.on('listening', function() {
            var queue = new varnish.VarnishQueue('127.0.0.1', server.address().port);
            for(var i = 0; i < 5; ++i) {
                queue.run_cmd('purge simon_is == the_best');
            }
        });
        setTimeout(function() { assert.equal(5, server.commands); done(); }, 100);
    }
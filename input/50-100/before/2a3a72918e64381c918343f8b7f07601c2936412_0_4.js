function() {
            client.run_cmd('purge obj.http.X == test', function(){});
            client.on('error', function(e) {
                ok = true;
                assert.equal('RESPONSE_PENDING', e.code);
            });
            client.run_cmd('purge obj.http.X == test', function(){});
        }
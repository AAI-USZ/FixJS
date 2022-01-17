function(res) {
                assert.ok(/^connect.sid=;/.test(res.headers['set-cookie'][0]));
                assert.response(server, {
                    url: '/api/Auth',
                    method: 'GET'
                }, {
                    body: '{"id":null}',
                    status: 200
                }, function(res) {
                    assert.ok(!res.headers['set-cookie']);
                });
            }
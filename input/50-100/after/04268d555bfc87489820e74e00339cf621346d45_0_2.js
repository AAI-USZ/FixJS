function(res) {
                var cookies = parseCookies(res.headers['set-cookie']);
                // Test that cookies are unset.
                assert.equal(cookies['bones.auth'].value, '');
                assert.equal(cookies['connect.sid'].value, '');
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
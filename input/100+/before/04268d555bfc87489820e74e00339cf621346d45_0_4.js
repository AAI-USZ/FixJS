function(res) {
        assert.response(server, {
            url: '/api/Auth',
            method: 'GET',
            headers: {
                'cookie': res.headers['set-cookie'][0].replace(/;.+$/, '')
            }
        }, {
            body: '{"id":"root","email":"test@example.com"}',
            status: 200
        }, function(res) {
            assert.response(server, {
                url: '/api/Auth',
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    'cookie': 'bones.token=1f4a1137268b8e384e50d0fb72c627c4; ' + res.headers['set-cookie'][0].replace(/;.+$/, '')
                },
                body: JSON.stringify({ "bones.token": "1f4a1137268b8e384e50d0fb72c627c4" })
            }, {
                body: '{"id":null}',
                status: 200
            }, function(res) {
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
            });
        });
    }
function(beforeExit) {
    // Test that session isn't loaded
    assert.response(server, {
        url: '/session'
    }, {
        body: 'false',
        status: 200
    }, function(res) {
        assert.ok(!res.headers['set-cookie']);
    });

    // Test anonymous session
    assert.response(server, {
        url: '/session',
        headers: {
            'cookie': 'bones.token=cc2a2513dfaa925dc0c7ef5cb33e612b'
        }
    }, {
        body: 'false',
        status: 200
    }, function(res) {
        assert.ok(!res.headers['set-cookie']);
    });

    // Test real session
    assert.response(server, {
        url: '/api/Auth',
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'cookie': 'bones.token=9e970a6908c7b53fced9a2e46634b41d'
        },
        body: JSON.stringify({ "bones.token": "9e970a6908c7b53fced9a2e46634b41d", id: 'root', password: 'test' })
    }, {
        body: '{"id":"root","email":"test@example.com"}',
        status: 200
    }, function(res) {
        assert.ok(res.headers['set-cookie']);
        assert.response(server, {
            url: '/session',
            headers: {
                'cookie': res.headers['set-cookie'][0].replace(/;.+$/, '')
            }
        }, {
            status: 200
        }, function(res) {
            var session = JSON.parse(res.body);
            assert.ok(session.lastAccess);
            assert.ok(session.cookie);
            assert.deepEqual(session.user, { id: 'root', email: 'test@example.com' });
        });
        assert.response(server, {
            url: '/model',
            headers: {
                'cookie': res.headers['set-cookie'][0].replace(/;.+$/, '')
            }
        }, {
            status: 200
        }, function(res) {
            assert.ok(JSON.parse(res.body).isAuthenticated);
            assert.ok(JSON.parse(res.body).isModel);
        });
    });
}
function(res) {
        assert.ok(res.headers['set-cookie']);
        var cookies = parseCookies(res.headers['set-cookie']);
        assert.equal(cookies['bones.auth'].value, 'yes');

        assert.response(server, {
            url: '/session',
            headers: {
                'cookie': 'connect.sid=' + cookies['connect.sid'].value
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
                'cookie': 'connect.sid=' + cookies['connect.sid'].value
            }
        }, {
            status: 200
        }, function(res) {
            assert.ok(JSON.parse(res.body).isAuthenticated);
            assert.ok(JSON.parse(res.body).isModel);
        });
    }
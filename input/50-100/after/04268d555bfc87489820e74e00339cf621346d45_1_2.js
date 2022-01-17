function(res) {
        var cookies = parseCookies(res.headers['set-cookie']);
        assert.response(server, {
            url: '/api/Auth',
            headers: {
                'cookie': 'connect.sid=' + cookies['connect.sid'].value
            }
        }, {
            body: '{"id":"resetpassword","email":"test@example.com"}',
            status: 200
        });

        // Second login with token must fail.
        assert.response(server, {
            url: '/reset-password/' + token
        }, {
            body: /Invalid login token/,
            status: 403
        });
    }
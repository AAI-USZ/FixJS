function(res) {
        assert.response(server, {
            url: '/api/Auth',
            headers: {
                'cookie': res.headers['set-cookie'][0].replace(/;.+$/, '')
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
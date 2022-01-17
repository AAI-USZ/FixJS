function(beforeExit, assert) {
    // Generate a fake token
    var token = auth.encryptExpiringRequest(user.id, model.secret(), user.password);

    assert.response(server, {
        url: '/api/Auth',
        method: 'GET'
    }, {
        body: '{"id":null}',
        status: 200
    });

    // First login with token.
    assert.response(server, {
        url: '/reset-password/' + token
    }, {
        body: 'Successfully logged in!',
        status: 200
    }, function(res) {
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
    });
}
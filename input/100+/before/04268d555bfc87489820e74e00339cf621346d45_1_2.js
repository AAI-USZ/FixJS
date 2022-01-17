function() {
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
    });

    // Second login with token must fail.
    assert.response(server, {
        url: '/reset-password/' + token
    }, {
        body: /Invalid login token/,
        status: 403
    });
}
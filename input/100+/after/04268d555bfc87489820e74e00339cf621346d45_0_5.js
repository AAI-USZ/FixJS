function (beforeExit, assert) {
    assert.response(server, {
        url: '/api/Auth',
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'cookie': 'bones.token=1f4a1137268b8e384e50d0fb72c627c4'
        },
        body: JSON.stringify({ "bones.token": "1f4a1137268b8e384e50d0fb72c627c4" })
    }, {
        body: /Invalid login/,
        status: 403
    }, function(res) {
        assert.ok(!res.headers['set-cookie']);
    });

    assert.response(server, {
        url: '/api/Auth',
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            'cookie': 'bones.token=1f4a1137268b8e384e50d0fb72c627c4'
        },
        body: JSON.stringify({ "bones.token": "1f4a1137268b8e384e50d0fb72c627c4" })
    }, {
        body: /"message":"Invalid login"/,
        status: 403
    }, function(res) {
        assert.ok(!res.headers['set-cookie']);
    });

    assert.response(server, {
        url: '/api/Auth',
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'cookie': 'bones.token=1f4a1137268b8e384e50d0fb72c627c4'
        },
        body: JSON.stringify({ "bones.token": "1f4a1137268b8e384e50d0fb72c627c4", id: 'root' })
    }, {
        body: /Invalid login/,
        status: 403
    }, function(res) {
        assert.ok(!res.headers['set-cookie']);
    });

    assert.response(server, {
        url: '/api/Auth',
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            'cookie': 'bones.token=1f4a1137268b8e384e50d0fb72c627c4'
        },
        body: JSON.stringify({ "bones.token": "1f4a1137268b8e384e50d0fb72c627c4", id: 'root' })
    }, {
        body: /"message":"Invalid login"/,
        status: 403
    }, function(res) {
        assert.ok(!res.headers['set-cookie']);
    });

    assert.response(server, {
        url: '/api/Auth',
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'cookie': 'bones.token=1f4a1137268b8e384e50d0fb72c627c4'
        },
        body: JSON.stringify({ "bones.token": "1f4a1137268b8e384e50d0fb72c627c4", password: 'test' })
    }, {
        body: /Invalid login/,
        status: 403
    }, function(res) {
        assert.ok(!res.headers['set-cookie']);
    });

    assert.response(server, {
        url: '/api/Auth',
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            'cookie': 'bones.token=1f4a1137268b8e384e50d0fb72c627c4'
        },
        body: JSON.stringify({ "bones.token": "1f4a1137268b8e384e50d0fb72c627c4", password: 'test' })
    }, {
        body: /"message":"Invalid login"/,
        status: 403
    }, function(res) {
        assert.ok(!res.headers['set-cookie']);
    });

    assert.response(server, {
        url: '/api/Auth',
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'cookie': 'bones.token=1f4a1137268b8e384e50d0fb72c627c4'
        },
        body: JSON.stringify({ "bones.token": "1f4a1137268b8e384e50d0fb72c627c4", id: 'root', password: 'bar' })
    }, {
        body: /Invalid login/,
        status: 403
    }, function(res) {
        assert.ok(!res.headers['set-cookie']);
    });

    assert.response(server, {
        url: '/api/Auth',
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            'cookie': 'bones.token=1f4a1137268b8e384e50d0fb72c627c4'
        },
        body: JSON.stringify({ "bones.token": "1f4a1137268b8e384e50d0fb72c627c4", id: 'root', password: 'bar' })
    }, {
        body: /"message":"Invalid login"/,
        status: 403
    }, function(res) {
        assert.ok(!res.headers['set-cookie']);
    });

    // Test login without token in body
    assert.response(server, {
        url: '/api/Auth',
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'cookie': 'bones.token=1f4a1137268b8e384e50d0fb72c627c4'
        },
        body: JSON.stringify({ id: 'root', password: 'test' })
    }, {
        body: /Forbidden/,
        status: 403
    }, function(res) {
        assert.ok(!res.headers['set-cookie']);
    });


    // Test login without token in body
    assert.response(server, {
        url: '/api/Auth',
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            'cookie': 'bones.token=1f4a1137268b8e384e50d0fb72c627c4'
        },
        body: JSON.stringify({ id: 'root', password: 'test' })
    }, {
        body: /"message":"Forbidden"/,
        status: 403
    }, function(res) {
        assert.ok(!res.headers['set-cookie']);
    });

    // Test login without token in cookie
    assert.response(server, {
        url: '/api/Auth',
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ "bones.token": "1f4a1137268b8e384e50d0fb72c627c4", id: 'root', password: 'test' })
    }, {
        body: /Forbidden/,
        status: 403
    }, function(res) {
        assert.ok(!res.headers['set-cookie']);
    });


    // Test login without token in cookie
    assert.response(server, {
        url: '/api/Auth',
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json'
        },
        body: JSON.stringify({ "bones.token": "1f4a1137268b8e384e50d0fb72c627c4", id: 'root', password: 'test' })
    }, {
        body: /"message":"Forbidden"/,
        status: 403
    }, function(res) {
        assert.ok(!res.headers['set-cookie']);
    });

    // Test login-status-logout sequence.
    assert.response(server, {
        url: '/api/Auth',
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'cookie': 'bones.token=1f4a1137268b8e384e50d0fb72c627c4'
        },
        body: JSON.stringify({ "bones.token": "1f4a1137268b8e384e50d0fb72c627c4", id: 'root', password: 'test' })
    }, {
        body: '{"id":"root","email":"test@example.com"}',
        status: 200
    }, function(res) {
        var cookies = parseCookies(res.headers['set-cookie']);
        assert.equal(cookies['bones.auth'].value, 'yes');
        assert.response(server, {
            url: '/api/Auth',
            method: 'GET',
            headers: {
                'cookie': 'connect.sid=' + cookies['connect.sid'].value
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
            });
        });
    });
}
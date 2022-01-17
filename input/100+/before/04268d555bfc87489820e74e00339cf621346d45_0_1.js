function(beforeExit) {
    assert.response(server, {
        url: '/api/User/root',
        method: 'GET'
    }, {
        body: '{"id":"root","email":"test@example.com"}',
        status: 200
    });

    assert.response(server, {
        url: '/api/User',
        method: 'GET'
    }, { status: 200 }, function(res) {
        var body = _(JSON.parse(res.body)).sortBy(function(r) { return r.id });
        var equals = _([
            { id: 'root', email: 'test@example.com' },
            { id: 'noemail' },
            { id: 'invalidemail', email: 'so not a valid email address!' },
            { id: 'resetpassword', email: 'test@example.com' }
        ]).sortBy(function(r) { return r.id; });
        assert.deepEqual(body, equals);
    });
}
function(beforeExit, assert) {
    // Generate a fake token
    var token = 'a' + auth.encryptExpiringRequest(user.id, model.secret(), user.password);

    assert.response(server, {
        url: '/reset-password/' + token
    }, {
        body: /Invalid login token/,
        status: 403
    });
}
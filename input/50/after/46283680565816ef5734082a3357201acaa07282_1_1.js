function (e, res, body) {
        assert.ok(res || e);
        assert.equal((res || e).headers.status || (res || e).statusCode, code);
    }
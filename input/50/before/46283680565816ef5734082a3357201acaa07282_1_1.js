function (e, res) {
        assert.ok(res || e);
        assert.equal((res || e).headers.status || (res || e).status, code);
    }
function (r) {
        var restricted = r.restricted();
        assert.isObject(restricted);

        assert.ok(restricted.title);
        assert.ok(!restricted.kind);
      }
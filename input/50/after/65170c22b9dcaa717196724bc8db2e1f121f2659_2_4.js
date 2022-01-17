function (r) {
        var restricted = r.toJSON();
        assert.isObject(restricted);

        assert.ok(!restricted.title);
        assert.ok(restricted.kind);
      }
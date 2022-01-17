function (err, obj) {
        assert.isNull(err);
        assert.equal(obj.length, 3);
        assert.equal(obj[0].key, 'bob');
        assert.equal(obj[1], null);
        assert.equal(obj[2].key, 'tim');
      }
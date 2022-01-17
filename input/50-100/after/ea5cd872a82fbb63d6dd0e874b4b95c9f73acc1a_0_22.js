function (err, obj) {
        assert.isNull(err);
        assert.equal(obj.length, 3);
        assert.equal(obj[0].id, 'bob');
        assert.equal(obj[1] || null, null);
        assert.equal(obj[2].id, 'tim');
      }
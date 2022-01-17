function (err, obj) {
        assert.isNull(err);
        assert.equal(obj.id, 'bob');
        assert.equal(obj.age, 31);
        assert.equal(obj.hair, 'red');
        assert.equal(obj.resource, 'Author');
      }
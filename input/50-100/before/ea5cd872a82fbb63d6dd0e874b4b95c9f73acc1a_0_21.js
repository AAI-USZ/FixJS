function (err, obj) {
        assert.isNull(err);
        assert.notEqual(obj.key, undefined);
        assert.equal(obj.age, 51);
        assert.equal(obj.hair, 'white');
        assert.equal(obj.resource, 'Author');
      }
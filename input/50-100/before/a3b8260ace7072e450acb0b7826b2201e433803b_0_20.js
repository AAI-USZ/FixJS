function (err, obj) {
          assert.isNull(err);
          assert.equal(obj.key, 'bob');
          assert.equal(obj.age, 35);
          assert.equal(obj.hair, 'black');
          assert.equal(obj.resource, 'Author');
        }
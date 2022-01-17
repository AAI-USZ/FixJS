function (err, obj) {
          assert.isNull(err);
          assert.equal(obj.id, 'han');
          assert.equal(obj.age, 30);
          assert.equal(obj.hair, 'red');
          assert.equal(obj.resource, 'Author');
        }
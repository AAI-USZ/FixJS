function (err, obj) {
          assert.isNull(err);
          assert.strictEqual(obj.constructor, resources[e].Author);
          assert.instanceOf(obj, resources[e].Author);
          assert.equal(obj.id, 'han');
          assert.equal(obj.age, 30);
          assert.equal(obj.hair, 'red');
          assert.equal(obj.resource, 'Author');
        }
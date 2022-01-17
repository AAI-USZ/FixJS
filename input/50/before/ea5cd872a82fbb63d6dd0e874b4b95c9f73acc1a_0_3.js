function (err, obj) {
            assert.isNull(err);
            assert.equal(obj.key, 'han');
            assert.equal(obj.resource, 'Creature');
          }
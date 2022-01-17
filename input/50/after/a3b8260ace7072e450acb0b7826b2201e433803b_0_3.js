function (err, obj) {
            assert.isNull(err);
            assert.equal(obj.id, 'han');
            assert.equal(obj.resource, 'Creature');
          }
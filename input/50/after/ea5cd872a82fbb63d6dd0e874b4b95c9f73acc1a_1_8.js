function (err, obj) {
                assert.isNull(err);
                assert.equal(obj.id, 'marak');
                assert.equal(obj.name, 'marak');
                assert.equal(obj.resource, 'User');
              }
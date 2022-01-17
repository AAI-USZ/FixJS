function (err, obj) {
                assert.isNull(err);
                assert.equal(obj.id, 'christian');
                assert.equal(obj.name, 'christian');
                assert.equal(obj.resource, 'User');
              }
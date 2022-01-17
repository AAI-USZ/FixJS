function (err, obj) {
            assert.isNull(err);
            assert.equal(obj.key, 'christian');
            assert.equal(obj.name, 'christian');
            assert.equal(obj.resource, 'User');
            assert.include(obj.repository_ids, 'issues');
          }
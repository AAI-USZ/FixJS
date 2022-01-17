function (err, obj) {
          assert.isNull(err);
          assert.equal(obj._id, 'christian');
          assert.equal(obj.name, 'christian');
          assert.equal(obj.resource, 'User');
          assert.lengthOf(obj.repository_ids, 2);
        }
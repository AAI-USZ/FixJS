function (err, obj) {
          assert.isNull(err);
          assert.equal(obj.id, 'marak');
          assert.equal(obj.name, 'marak');
          assert.equal(obj.resource, 'User');
          assert.lengthOf(obj.repository_ids, 2);
          assert.lengthOf(obj.follower_ids, 2);
        }
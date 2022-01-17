function (err, obj) {
            assert.isNull(err);
            assert.equal(obj.id, 'forum/forum/develop/nodejitsu/haibu');
            assert.equal(obj.name, 'haibu');
            assert.equal(obj.resource, 'Forum');
            assert.equal(obj.forum_id, 'forum/develop/nodejitsu');
            assert.lengthOf(obj.forum_ids, 0);
          }
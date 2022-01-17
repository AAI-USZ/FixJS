function (err, obj) {
                assert.isNull(err);
                assert.lengthOf(obj.repository_ids, 3);
                assert.include(obj.repository_ids, 'haibu');
              }
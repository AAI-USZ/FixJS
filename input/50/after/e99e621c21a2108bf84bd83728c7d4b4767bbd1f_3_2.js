function (err, parent) {
                assert.isNull(err);
                assert.lengthOf(parent.repository_ids, 2);
              }
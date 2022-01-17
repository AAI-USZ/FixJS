function (err, obj) {
          assert.isNull(err);
          assert.lengthOf(obj.repository_ids, 2);
        }
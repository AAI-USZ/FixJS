function (err, obj) {
          assert.isNull(err);
          assert.lengthOf(obj.repsitory_ids, 2);
        }
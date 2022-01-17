function (err, obj) {
          assert.isNull(err);
          assert.isArray(obj);
          assert.equal(obj.length, 3);
          assert.equal(obj[0].key, 'bob');
          assert.equal(obj[1].key, 'mat');
          assert.equal(obj[2].key, 'tim');
        }
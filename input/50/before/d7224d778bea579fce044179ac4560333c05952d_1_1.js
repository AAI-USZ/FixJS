function (e, obj) {
          assert.equal(that.save, 0);
          that.create += 2;
          obj.counter += 2;
          return true;
        }
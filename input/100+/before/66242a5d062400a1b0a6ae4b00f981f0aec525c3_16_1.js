function() {
      var keys = Object.keys(result);
      var key;

      assert.deepEqual(
        keys.sort(),
        ids.sort()
      );

      assert.equal(eventFired, subject._accounts);

      for (key in result) {
        var obj = result[key];

        assert.ok(subject._accounts[key]);
        assert.instanceOf(subject._accounts[key], Calendar.Models.Account);
        assert.ok(obj._id);
        assert.instanceOf(obj, Calendar.Models.Account);
        assert.equal(obj.providerType, 'Local');
      }
    }
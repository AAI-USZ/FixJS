function() {
    var ids = [];
    var all;
    var result;
    var eventFired;

    suiteSetup(function() {
      ids.length = 0;
    });

    function add() {
      setup(function(done) {
        subject.persist({ providerType: 'Local' }, function(err, id) {
          ids.push(id.toString());

          done();
        });
      });
    }

    add();
    add();

    setup(function(done) {
      eventFired = null;
      subject.once('load', function(data) {
        eventFired = data;
      });

      // wipe out _accounts beforehand
      // so not to confuse add's caching
      // with alls
      subject._accounts = {};
      subject.load(function(err, data) {
        if (err) {
          return done(err);
        }
        result = data;
        // HACK - required
        // so the state of this test
        // actually is in the next tick.
        setTimeout(function() {
          done();
        }, 0);
      });
    });

    test('result', function() {
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
    });
  }
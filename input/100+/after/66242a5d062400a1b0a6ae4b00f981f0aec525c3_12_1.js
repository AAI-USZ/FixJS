function(done) {
    var loaded = {
      account: false,
      calendar: false
    };

    var account = subject.getStore('Account');
    var calendar = subject.getStore('Calendar');

    account.load = function(callback) {
      callback(null, {});
      loaded.account = true;
    }

    calendar.load = function(callback) {
      callback(null, {});
      loaded.calendar = true;
    }

    assert.ok(!subject.isOpen);

    subject.load(function(err) {
      if (err) {
        done(err);
        return;
      }
      assert.ok(subject.isOpen);
      done(function() {
        assert.ok(loaded.account, 'should load account');
        assert.ok(loaded.calendar, 'should load calendar');
      });
    });
  }
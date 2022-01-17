function(done) {
      var finished, i, tasks, total, _i;
      finished = false;
      total = 10000;
      tasks = new balUtil.Group(function(err) {
        if (err) {
          return done(err);
        }
        assert.equal(false, finished, 'the group of tasks only finished once');
        return finished = true;
      });
      for (i = _i = 0; 0 <= total ? _i < total : _i > total; i = 0 <= total ? ++_i : --_i) {
        tasks.push(function(complete) {
          return complete();
        });
      }
      assert.equal(0, tasks.completed, 'no tasks should have started yet');
      tasks.sync();
      return wait(5000, function() {
        assert.equal(total, tasks.completed, 'the expected number of tasks ran ' + ("" + tasks.completed + "/" + total));
        assert.equal(false, tasks.isRunning(), 'isRunning() returned false');
        assert.equal(true, tasks.hasCompleted(), 'hasCompleted() returned true');
        assert.equal(true, tasks.hasExited(), 'hasExited() returned true');
        return done();
      });
    }
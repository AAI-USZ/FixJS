function(done) {
      var finished, i, tasks, total, _i;
      total = 10000;
      finished = false;
      tasks = new balUtil.Group(function(err) {
        assert.equal(false, finished, 'the group of tasks only finished once');
        finished = true;
        return assert.equal(false, err != null, 'no error is present');
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
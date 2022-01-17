function(done) {
      var finished, tasks, total;
      finished = 0;
      total = 2;
      tasks = new balUtil.Group('sync', {
        autoClear: true
      }, function(err) {
        if (err) {
          return done(err);
        }
        return ++finished;
      });
      assert.equal('sync', tasks.mode, 'mode was correctly set to sync');
      assert.equal(true, tasks.autoClear, 'autoClear was correctly set to true');
      tasks.pushAndRun(function(complete) {
        return complete();
      });
      wait(500, function() {
        tasks.pushAndRun(function(complete) {
          return wait(500, function() {
            return complete();
          });
        });
        return assert.equal(true, tasks.isRunning(), 'isRunning() returned true');
      });
      return wait(2000, function() {
        assert.equal(total, finished, 'it exited the correct number of times');
        assert.equal(false, tasks.isRunning(), 'isRunning() returned false');
        assert.equal(false, tasks.hasCompleted(), 'hasCompleted() returned false');
        assert.equal(false, tasks.hasExited(), 'hasExited() returned false');
        return done();
      });
    }
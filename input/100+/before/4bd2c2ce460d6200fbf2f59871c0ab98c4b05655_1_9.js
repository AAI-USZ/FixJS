function(done) {
      var finished, tasks;
      finished = 0;
      tasks = new balUtil.Group('sync', {
        autoClear: true
      }, function(err) {
        ++finished;
        return assert.equal(false, err != null, 'no error is present');
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
        assert.equal(2, finished, 'it exited the correct number of times');
        assert.equal(false, tasks.isRunning(), 'isRunning() returned false');
        assert.equal(false, tasks.hasCompleted(), 'hasCompleted() returned false');
        assert.equal(false, tasks.hasExited(), 'hasExited() returned false');
        return done();
      });
    }
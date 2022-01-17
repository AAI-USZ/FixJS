function(done) {
      var finished, firstTaskFinished, firstTaskRun, secondTaskFinished, secondTaskRun, tasks;
      firstTaskRun = false;
      secondTaskRun = false;
      firstTaskFinished = false;
      secondTaskFinished = false;
      finished = false;
      tasks = new balUtil.Group('async', function(err) {
        assert.equal(false, finished, 'the group of tasks only finished once');
        finished = true;
        return assert.equal(false, err != null, 'no error is present');
      });
      assert.equal('async', tasks.mode, 'mode was correctly set to async');
      tasks.pushAndRun(function(complete) {
        firstTaskRun = true;
        assert.equal(false, secondTaskRun, 'the first task ran first as expected');
        return wait(1000, function() {
          firstTaskFinished = true;
          assert.equal(true, secondTaskFinished, 'the first task completed second as expected');
          return complete();
        });
      });
      assert.equal(true, tasks.isRunning(), 'isRunning() returned true');
      tasks.pushAndRun(function(complete) {
        secondTaskRun = true;
        assert.equal(true, firstTaskRun, 'the second task ran second as expected');
        return wait(500, function() {
          secondTaskFinished = true;
          assert.equal(false, firstTaskFinished, 'the second task completed first as expected');
          return complete();
        });
      });
      return wait(4000, function() {
        assert.equal(2, tasks.completed, 'only the expected number of tasks ran');
        assert.equal(false, tasks.isRunning(), 'isRunning() returned false');
        assert.equal(true, tasks.hasCompleted(), 'hasCompleted() returned true');
        assert.equal(true, tasks.hasExited(), 'hasExited() returned true');
        return done();
      });
    }
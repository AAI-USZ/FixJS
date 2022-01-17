function(done) {
      var finished, firstTaskFinished, firstTaskRun, secondTaskFinished, secondTaskRun, tasks;
      firstTaskRun = false;
      secondTaskRun = false;
      firstTaskFinished = false;
      secondTaskFinished = false;
      finished = false;
      tasks = new balUtil.Group(function(err) {
        assert.equal(false, finished, 'the group of tasks only finished once');
        finished = true;
        return assert.equal(true, err != null, 'an error is present');
      });
      tasks.push(function(complete) {
        firstTaskRun = true;
        assert.equal(false, secondTaskRun, 'the first task ran first as expected');
        return wait(1000, function() {
          firstTaskFinished = true;
          assert.equal(false, secondTaskFinished, 'the first task completed first as expected');
          return complete();
        });
      });
      tasks.push(function(complete) {
        secondTaskRun = true;
        assert.equal(true, firstTaskRun, 'the second task ran second as expected');
        return wait(500, function() {
          secondTaskFinished = true;
          assert.equal(true, firstTaskFinished, 'the second task completed second as expected');
          return complete(new Error('deliberate error'));
        });
      });
      assert.equal(0, tasks.completed, 'no tasks should have started yet');
      tasks.sync();
      assert.equal(true, tasks.isRunning(), 'isRunning() returned true');
      return wait(2000, function() {
        assert.equal(1, tasks.completed, 'only the expected number of tasks ran');
        assert.equal(false, tasks.isRunning(), 'isRunning() returned false');
        assert.equal(false, tasks.hasCompleted(), 'hasCompleted() returned true');
        assert.equal(true, tasks.hasExited(), 'hasExited() returned true');
        return done();
      });
    }
function(done) {
      var finished, firstTaskFinished, firstTaskRun, secondTaskFinished, secondTaskRun, tasks, total;
      firstTaskRun = false;
      secondTaskRun = false;
      firstTaskFinished = false;
      secondTaskFinished = false;
      finished = false;
      total = 2;
      tasks = new balUtil.Group(function(err) {
        if (err) {
          return done(err);
        }
        assert.equal(false, finished, 'the group of tasks only finished once');
        return finished = true;
      });
      tasks.push(function(complete) {
        firstTaskRun = true;
        assert.equal(false, secondTaskRun, 'the first task ran first as expected');
        return wait(1000, function() {
          firstTaskFinished = true;
          assert.equal(true, secondTaskFinished, 'the first task completed second as expected');
          return complete();
        });
      });
      tasks.push(function(complete) {
        secondTaskRun = true;
        assert.equal(true, firstTaskRun, 'the second task ran second as expected');
        return wait(500, function() {
          secondTaskFinished = true;
          assert.equal(false, firstTaskFinished, 'the second task completed first as expected');
          return complete();
        });
      });
      assert.equal(0, tasks.completed, 'no tasks should have started yet');
      tasks.async();
      assert.equal(true, tasks.isRunning(), 'isRunning() returned true');
      return wait(2000, function() {
        assert.equal(total, tasks.completed, 'the expected number of tasks ran ' + ("" + tasks.completed + "/" + total));
        assert.equal(false, tasks.isRunning(), 'isRunning() returned false');
        assert.equal(true, tasks.hasCompleted(), 'hasCompleted() returned true');
        assert.equal(true, tasks.hasExited(), 'hasExited() returned true');
        return done();
      });
    }
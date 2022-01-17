function(done) {
      var finished, firstTaskFinished, secondTaskFinished, tasks, total;
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
      tasks.total = 2;
      wait(1000, function() {
        firstTaskFinished = true;
        assert.equal(true, secondTaskFinished, 'the first task ran second as expected');
        return tasks.complete();
      });
      wait(500, function() {
        secondTaskFinished = true;
        assert.equal(false, firstTaskFinished, 'the second task ran first as expected');
        return tasks.complete();
      });
      assert.equal(0, tasks.completed, 'no tasks should have started yet');
      return wait(2000, function() {
        assert.equal(total, tasks.completed, 'the expected number of tasks ran ' + ("" + tasks.completed + "/" + total));
        assert.equal(false, tasks.isRunning(), 'isRunning() returned false');
        assert.equal(true, tasks.hasCompleted(), 'hasCompleted() returned true');
        assert.equal(true, tasks.hasExited(), 'hasExited() returned true');
        return done();
      });
    }
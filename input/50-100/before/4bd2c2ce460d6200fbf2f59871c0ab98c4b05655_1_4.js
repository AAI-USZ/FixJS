function() {
        assert.equal(1, tasks.completed, 'only the expected number of tasks ran');
        assert.equal(false, tasks.isRunning(), 'isRunning() returned false');
        assert.equal(false, tasks.hasCompleted(), 'hasCompleted() returned true');
        assert.equal(true, tasks.hasExited(), 'hasExited() returned true');
        return done();
      }
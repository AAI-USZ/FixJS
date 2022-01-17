function() {
        assert.equal(total, finished, 'it exited the correct number of times');
        assert.equal(false, tasks.isRunning(), 'isRunning() returned false');
        assert.equal(false, tasks.hasCompleted(), 'hasCompleted() returned false');
        assert.equal(false, tasks.hasExited(), 'hasExited() returned false');
        return done();
      }
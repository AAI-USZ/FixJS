function() {
        assert.equal(total, tasks.completed, 'the expected number of tasks ran ' + ("" + tasks.completed + "/" + total));
        assert.equal(false, tasks.isRunning(), 'isRunning() returned false');
        assert.equal(true, tasks.hasCompleted(), 'hasCompleted() returned true');
        assert.equal(true, tasks.hasExited(), 'hasExited() returned true');
        return done();
      }
function(done) {
      var finished, tasks, total;
      finished = false;
      total = 2;
      tasks = new balUtil.Group(function(err) {
        if (err) {
          return done(err);
        }
        assert.equal(false, finished, 'the group of tasks only finished once');
        return finished = true;
      });
      tasks.push({
        blah: 1
      }, function() {
        return assert.equal(1, this.blah, 'context was applied correctly');
      });
      tasks.push({
        blah: 2
      }, function() {
        return assert.equal(2, this.blah, 'context was applied correctly');
      });
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
function() {
      var now = new Date();
      var weekStartedTimestamp = DateHelper.thisWeekStarted();
      var weekStarted = new Date(weekStartedTimestamp);
      console.log(now, weekStarted);
      assert.equal(true, weekStartedTimestamp <= now.valueOf());
      assert.equal(weekStarted.getDay(), 0);
      assertMidnight(weekStarted);
    }
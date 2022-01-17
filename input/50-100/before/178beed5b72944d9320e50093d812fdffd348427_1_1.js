function() {
      var now = new Date();
      var weekStartedTimestamp = DateHelper.thisWeekStarted();
      var weekStarted = new Date(weekStartedTimestamp);
      assert.equal(true, weekStartedTimestamp <= now.valueOf());
      assert.equal(weekStarted.getDay(), 1);
      assertMidnight(weekStarted);
    }
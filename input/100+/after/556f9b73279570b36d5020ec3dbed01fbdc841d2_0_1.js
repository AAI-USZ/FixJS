function(time) {
      var min, minutePattern, sec, secondPattern, testPattern;
      testPattern = /:/;
      minutePattern = /^\d*(?=:)/;
      secondPattern = /[0-5][0-9]$/;
      if (testPattern.test(time)) {
        min = parseInt(minutePattern.exec(time), 10);
        sec = parseInt(secondPattern.exec(time), 10);
        return min * 60 + sec;
      } else {
        return parseInt(time, 10);
      }
    }
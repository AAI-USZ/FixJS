function(index) {
      var marker, min, minutePattern, sec, secondPattern, testPattern;
      marker = this.trackInfo[index].marker;
      testPattern = /:/;
      minutePattern = /^\d*(?=:)/;
      secondPattern = /[0-5][0-9]$/;
      if (testPattern.test(marker)) {
        min = parseInt(minutePattern.exec(marker), 10);
        sec = parseInt(secondPattern.exec(marker), 10);
        return min * 60 + sec;
      } else {
        return parseInt(this.trackInfo[index].marker, 10);
      }
    }
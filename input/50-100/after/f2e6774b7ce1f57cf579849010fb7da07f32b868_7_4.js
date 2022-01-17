function(day, month) {
      var states;

      // 1. the date is today (real time)
      if (this.isToday(day)) {
        return this.PRESENT;
      }

      // 2. the date is in the past (real time)
      if (this.isPast(day)) {
        states = this.PAST;
      // 3. the date is in the future (real time)
      } else {
        states = this.FUTURE;
      }

      // 4. the date is not in the current month (relative time)
      if (day.getMonth() !== month.getMonth()) {
        states += ' ' + this.OTHER_MONTH;
      }

      return states;
    }
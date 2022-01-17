function(startDate) {
      //local day position
      var currentDay = startDate.getDay(),
          startDay = startDate.getDate() - currentDay,
          weeksDayStart,
          weekDay,
          result = [],
          i = 1;


      //clone day
      weeksDayStart = this.createDay(startDate, startDay);
      result.push(weeksDayStart);

      for (; i < 7; i++) {
        result.push(new Date(
          weeksDayStart.getFullYear(),
          weeksDayStart.getMonth(),
          weeksDayStart.getDate() + i
        ));
      }

      return result;
    }
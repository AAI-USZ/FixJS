function(startDate) {
      //local day position
      var currentDay = startDate.getDay(),
          startDay = startDate.getDate() - currentDay,
          weeksDayStart = this.createDay(startDate, startDay),
          result = [weeksDayStart];

      for (var i = 1; i < 7; i++) {
        result.push(new Date(
          weeksDayStart.getFullYear(),
          weeksDayStart.getMonth(),
          weeksDayStart.getDate() + i
        ));
      }

      return result;
    }
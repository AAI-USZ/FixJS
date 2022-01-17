function() {
    var weekendDays = [5, 6]
      , currentDay  = moment().day()

    return (weekendDays.indexOf(currentDay) > -1)
  }
function() {
    var weekendDays = [6, 0]
      , currentDay  = moment().day()

    return (weekendDays.indexOf(currentDay) > -1)
  }
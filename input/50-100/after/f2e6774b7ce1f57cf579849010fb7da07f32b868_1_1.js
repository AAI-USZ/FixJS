function dh_thisWeekStarted() {
    var now = new Date();
    var dayOfTheWeek = now.getDay();
    var firstDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      //getDay is zero based so if today
      //is the start of the week it will not
      //change the date. Also if we get
      //into negative days the date object
      //handles that too...
      now.getDate() - dayOfTheWeek
    );
    return this.getMidnight(firstDay);
  }
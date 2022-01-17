function() {
    var date;
    date = new Date();
    return "" + (padLeft(date.getHours())) + ":" + (padLeft(date.getMinutes())) + ":" + (padLeft(date.getSeconds()));
  }
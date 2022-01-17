function(reversed_time) {
    var date, time;
    if (!reversed_time) return reversed_time;
    reversed_time = reversed_time.split(" ");
    if (reversed_time.length > 1) {
      date = reversed_time[0], time = reversed_time[1];
    } else {
      date = reversed_time[0];
      time = null;
    }
    date = date.split('/');
    if (date[0] === '1970') return "המועד לא הוגדר על ידי הוועדה";
    date = "" + date[2] + "/" + date[1] + "/" + date[0];
    if (time) {
      return "" + date + " " + time;
    } else {
      return date;
    }
  }
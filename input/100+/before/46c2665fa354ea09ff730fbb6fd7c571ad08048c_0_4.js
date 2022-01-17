function(time) {
    var date = exports.stringToDate(time);
    if (!date || !date.getTime) return "";
    var dow = getDayOfWeek(date), month = getMonth(date), day = date.getDate();
    switch (day) {
      case 31:
      case 21:
      case 1:
        day += "st";
        break;
      case 22:
      case 2:
        day += "nd";
        break;
      case 3:
        day += "rd";
        break;
      default:
        day += "th";
    }
    var year = date.getFullYear();
    return dow + " " + month + " " + day + ", " + year;
}
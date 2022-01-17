function(date){
    //Jun 7 2012 − 10:45am
    var meridiem = "am";
    var hours = date.getHours();
    if(hours >=12){
      meridiem = "pm";
      hours -= 12
    }
    if(hours == 0)
      hours =12;
    var mins = date.getMinutes();
    if(mins < 10)
        mins = "0"+mins;
    return dateTools.MONTH_NAMES_SHORT[date.getMonth()] + " " + date.getDate() + " " + " "+ date.getFullYear() + " " +
        hours + ":" + mins + " " + meridiem;
  }
function(date){
    //Jun 7 2012 − 10:45am
    var meridiem = "am";
    var hours = date.getHours();
    if(hours >=12){
      meridiem = "pm";
      hours -= 12
    }
    return dateTools.MONTH_NAMES_SHORT[date.getMonth()] + " " + date.getDate() + " " + " "+ date.getFullYear() + " - " +
        hours + ":" + date.getMinutes() + " " + meridiem;
  }
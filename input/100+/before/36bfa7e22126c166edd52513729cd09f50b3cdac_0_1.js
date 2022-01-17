function getHourAndMeridiem(date, callback){
  var hour = "";
  var meridiem = "";

  if(date.getHours() < 12){
    meridiem = "am";

    if(date.getHours() !== 0){
      hour+= date.getHours();
    }
    else{
      hour = "12";
    }
  }
  else{
    meridiem = "pm";
    hour+= (date.getHours() - 12);
  }

  callback(hour, meridiem);
}
function getDate(date){
  var dateString = "" + date.getDate();

  if(date.getDate() % 10 > 3 || date.getDate() % 10 === 0)
    dateString += "th";
  else if(date.getDate() === 3)
    dateString += "rd";
  else if(date.getDate() === 2)
    dateString += "nd";
  else if(date.getDate() === 1)
    dateString += "st";

  return dateString;
}
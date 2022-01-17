function getDate(date){
  switch (date.getDate()) {
    case 1: case 21: case 31: return date.getDate() + "st";
    case 2: case 22: return date.getDate() + "nd";
    case 3: case 23: return date.getDate() + "rd";
  }
  
  return date.getDate() + "th";
}
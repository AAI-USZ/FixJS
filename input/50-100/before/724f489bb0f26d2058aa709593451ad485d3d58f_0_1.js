function currentDateFitbitString() {
  var now = new Date();
  var month = (now.getUTCMonth()+1).toString();
  if (month.length == 1) month = "0" + month;
  return now.getUTCFullYear() + '-' +  month + '-' + now.getUTCDate();
}
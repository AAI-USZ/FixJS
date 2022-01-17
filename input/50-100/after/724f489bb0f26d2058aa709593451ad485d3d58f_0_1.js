function currentDateFitbitString() {
  var now = new Date();
  var month = (now.getUTCMonth()+1).toString();
  if (month.length == 1) month = "0" + month;

  var date = now.getUTCDate().toString();
  if (date.length == 1) date = "0" + date;

  return now.getUTCFullYear() + '-' +  month + '-' + date;
}
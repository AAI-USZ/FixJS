function(string) {
  var date = new Date(string);
  return isNaN(date) ? null : date;
}
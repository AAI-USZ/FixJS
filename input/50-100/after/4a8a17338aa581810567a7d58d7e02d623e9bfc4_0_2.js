function() {
  var seven_days_from_now = new Date();
  seven_days_from_now.setDate(seven_days_from_now.getDate() + 7);
  equal($.cookie('c', 'v', {expires:7}), 'c=v; expires='+seven_days_from_now.toUTCString(), 'should return the cookie string with expires');
}
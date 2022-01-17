function () {
  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 5);
    document.cookie = 'c=testcookie; expires=' + tomorrow.toUTCString();
    equal($.cookie('c'), 'testcookie', 'should return value');
}
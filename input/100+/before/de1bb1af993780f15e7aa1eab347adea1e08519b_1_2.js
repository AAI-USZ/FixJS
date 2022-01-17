function (assert) {
    assert.expect(2);

    var time = require("time");
    var zone = "America/Chicago";

    // New Orleans time
    var d = new time.Date();
    d.setTimezone(zone);

    // Current time
    t = new time.Date();
    t.setTimezone("America/New_York");

    // If current time is New Orleans time, switch to Los Angeles..
    if (t.getHours() === d.getHours()) {
      zone = "America/Los_Angeles";
      d.setTimezone(zone);
    }
    assert.notEqual(d.getHours(), t.getHours());

    if ((58 - t.getSeconds()) <= 0) {
      setTimeout(testRun, (60000 - (t.getSeconds()*1000)) + 1000);
    } else {
      testRun();
    }

    function testRun() {
      var s = d.getSeconds()+1;
      d.setSeconds(s);
      var c = new cron.CronJob(d, function() {
        assert.ok(true);
      }, null, true, zone);
      setTimeout(function() {
        c.stop();
        assert.done();
      }, 2250);
    }
  }
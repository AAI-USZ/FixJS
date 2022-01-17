function (assert) {
    assert.expect(3);

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
    assert.notEqual(d.getTimezone(), t.getTimezone());

    var seconds = d.getSeconds() + 1;
    var c = new cron.CronJob(seconds + ' ' + d.getMinutes() + ' ' + d.getHours() +  ' * * *', function(){
      assert.ok(true);
    }, undefined, true, zone);

    setTimeout(function() {
      c.stop();
      assert.done();
    }, 1250);
  }
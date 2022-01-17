function (assert) {
    assert.expect(3);

    var time = require("time");
    var zone = "America/Chicago";

    // New Orleans time
    var t = new time.Date();
    t.setTimezone(zone);

    // Current time
    d = new Date();

    // If current time is New Orleans time, switch to Los Angeles..
    if (t.getHours() === d.getHours()) {
      zone = "America/Los_Angeles";
      t.setTimezone(zone);
    }
    assert.notEqual(d.getHours(), t.getHours());
    assert.ok(!(Date instanceof time.Date));

    t.setSeconds(t.getSeconds()+1);
    var c = new cron.CronJob(t, function() {
      assert.ok(true);
    }, null, true, zone);
    setTimeout(function() {
      c.stop();
      assert.done();
    }, 2250);
  }
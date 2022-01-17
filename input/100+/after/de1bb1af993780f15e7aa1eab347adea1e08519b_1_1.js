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

    // If t = 59s12m then t.setSeconds(60)
    // becones 00s13m so we're fine just doing
    // this and no testRun callback.
    t.setSeconds(t.getSeconds()+1);
    // Run a job designed to be executed at a given 
    // time in `zone`, making sure that it is a different
    // hour than local time.
    var c = new cron.CronJob(t.getSeconds() + ' ' + t.getMinutes() + ' ' + t.getHours() +  ' * * *', function(){
      assert.ok(true);
    }, undefined, true, zone);

    setTimeout(function() {
      c.stop();
      assert.done();
    }, 1250);
  }
function(assert) {
    assert.expect(5);
    var c = new cron.CronJob('* * * * * *', function(done) {
      done();
    }, function() {
      assert.ok(true);
    }, true);
    setTimeout(function() {
      c.stop();
      assert.done();
    }, 5250);
  }
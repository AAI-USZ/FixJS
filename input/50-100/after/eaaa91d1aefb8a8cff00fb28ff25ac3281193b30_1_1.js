function(assert) {
    assert.expect(2);
    var c = new cron.CronJob('* * * * * *', function(done) {
      assert.ok(true);
    }, function () {
      assert.ok(true);
      assert.done();
    }, true);
    setTimeout(function() {
      c.stop();
    }, 1250);
  }
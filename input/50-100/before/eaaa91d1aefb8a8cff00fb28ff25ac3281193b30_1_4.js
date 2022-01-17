function(assert) {
    assert.expect(1);
    var c = new cron.CronJob({
      cronTime: '* * * * * *',
      onTick: function(done) {
        done();
      },
      onComplete: function () {
        assert.ok(true);
      },
      start: true
    });
    setTimeout(function() {
      c.stop();
      assert.done();
    }, 1250);
  }
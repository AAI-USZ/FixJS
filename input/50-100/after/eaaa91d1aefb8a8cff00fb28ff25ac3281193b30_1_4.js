function(assert) {
    assert.expect(2);
    var c = new cron.CronJob({
      cronTime: '* * * * * *',
      onTick: function(done) {
        assert.ok(true);
      },
      onComplete: function () {
        assert.ok(true);
        assert.done();
      },
      start: true
    });
    setTimeout(function() {
      c.stop();
    }, 1250);
  }
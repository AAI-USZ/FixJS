function(assert) {
    assert.expect(2);
    var prepDate = new Date();
    if ((58 - prepDate.getSeconds()) <= 0) {
      setTimeout(testRun, (60000 - (prepDate.getSeconds()*1000)) + 1000);
    } else {
      testRun();
    }

    function testRun() {
      var d = new Date();
      var s = d.getSeconds()+1;
      d.setSeconds(s);
      var c = new cron.CronJob(d, function() {
        assert.ok(true);
      }, function() {
        assert.ok(true);
        assert.done();
      }, true);
      setTimeout(function() {
        c.stop();
      }, 2250);
    }
  }
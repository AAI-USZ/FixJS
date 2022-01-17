function()
  {
    var obj = {
      target : null
    };
    var callback = function(ev) {
      this.target = ev.getTarget();
      this.currentTarget = ev.getCurrentTarget();
    };

    var test = q.create('<input id="foo" type="text" />');
    test.appendTo(this.sandbox[0]);
    test.on("focus", callback, obj);

    var that = this;
    window.setTimeout(function() {
      test[0].focus();
    }, 100);

    this.wait(function() {
      this.assertEquals(test[0], obj.target);
      this.assertEquals(test[0], obj.currentTarget);
    }, 200, this);
  }
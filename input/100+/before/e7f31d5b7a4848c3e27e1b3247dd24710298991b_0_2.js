function() {
    var normalizer = function(event) {
      event.affe = "juhu";
      return event;
    };
    this.__registerNormalization("*", normalizer);

    var obj1, obj2;
    obj1 = obj2 = {
      normalized : false
    };
    var callback = function(ev) {
      if (ev.affe && ev.affe === "juhu") {
        this.normalized = true;
      }
    };

    var test = q.create('<input type="text"></input>');
    test.appendTo(this.sandbox[0]);
    test.on("focus", callback, obj1);
    test.on("blur", callback, obj2);


    var that = this;
    window.setTimeout(function() {
      test[0].focus();
      test[0].blur();
    }, 100);

    this.wait(function() {
      this.assert(obj1.normalized, "Event was not manipulated!");
      this.assert(obj2.normalized, "Event was not manipulated!");
      q.$unregisterEventNormalization("*", normalizer);
    }, 200, this);
  }
function()
  {
    this.__registerNormalization("focus", function(event) {
      event.affe = "juhu";
      return event;
    });

    var normalizer1 = function(event) {
      event.affe += " hugo";
      return event;
    };
    this.__registerNormalization("focus", normalizer1);

    var normalizer2 = function(event) {
      event.affe += " affe";
      return event;
    };

    this.__registerNormalization("focus", normalizer2);

    var obj = {
      normalized : false
    };
    var callback = function(ev) {
      if (ev.affe && ev.affe === "juhu affe") {
        this.normalized = true;
      }
    };

    var test = q.create('<input type="text"></input>');
    test.appendTo(this.sandbox[0]);
    test.on("focus", callback, obj);

    q.$unregisterEventNormalization("focus", normalizer1);

    var that = this;
    window.setTimeout(function() {
      test[0].focus();
    }, 100);

    this.wait(function() {
      this.assert(obj.normalized, "Event was not manipulated!");
      q.$unregisterEventNormalization("focus", normalizer2);
    }, 200, this);
  }
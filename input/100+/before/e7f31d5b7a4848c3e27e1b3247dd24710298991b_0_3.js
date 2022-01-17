function() {
    this.__normalizeFocusBlur = function(event) {
      event.affe = "juhu";
      return event;
    };
    this.__registerNormalization(["focus", "blur"], this.__normalizeFocusBlur);

    var obj1, obj2;
    obj1 = obj2 = {
      normalized : false
    };
    var callback = function(ev) {
      if (ev.affe && ev.affe === "juhu") {
        this.normalized = true;
      }
    };

    var test = q.create('<input type="text" />');
    test.appendTo(this.sandbox[0]);
    test.on("focus", callback, obj1);
    test.on("blur", callback, obj2);

    var that = this;
    window.setTimeout(function() {
      test[0].focus();
    }, 100);

    // IE < 9 won't fire the focus event if blur() is called immediately after
    // focus()
    window.setTimeout(function() {
      test[0].blur();
    }, 250);

    this.wait(function() {
      this.assert(obj1.normalized, "Focus event was not manipulated!");
      this.assert(obj2.normalized, "Blur event was not manipulated!");
    }, 500, this);
  }
function()
  {
    var methods = ["getRelatedTarget", "preventDefault", "stopPropagation"];

    var obj = {
      target : null
    };
    var callback = function(ev) {
      for (var i=0, l=methods.length; i<l; i++) {
        var methodName = methods[i];
        this[methodName] = (typeof ev[methodName] == "function");
      }
    };

    var test = q.create('<input type="text"></input>');
    test.appendTo(this.sandbox[0]);
    test.on("focus", callback, obj);

    var that = this;
    window.setTimeout(function() {
      test[0].focus();
    }, 100);

    this.wait(function() {
      for (var i=0, l=methods.length; i<l; i++) {
        this.assertTrue(obj[methods[i]]);
      }
    }, 200, this);
  }
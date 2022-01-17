function() {
    var fired = null;
    a.bind("custom", function() { fired = true; });
    a.trigger("custom");
    equal(fired, true);
  }
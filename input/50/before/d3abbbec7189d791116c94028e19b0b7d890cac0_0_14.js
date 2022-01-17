function() {
    var fired = null;
    a.bind("custom", function() { fired = true; });
    a.trigger("custom");
    equals(fired, true);
  }
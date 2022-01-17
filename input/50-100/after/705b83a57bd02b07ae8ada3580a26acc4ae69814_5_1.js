function(adder) {
    var add;
    add = adder.add;
    return {
      init: function() {
        return add("foo");
      }
    };
  }
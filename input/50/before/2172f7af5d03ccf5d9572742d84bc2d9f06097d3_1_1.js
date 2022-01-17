function(id) {
      var span = $.extend({}, this); // clone
      span.id = id;
      span.initContainers(); // protect from shallow copy
      return span;
    }
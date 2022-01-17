function(id) {
      var span = $.extend(new Span(), this); // clone
      span.id = id;
      span.initContainers(); // protect from shallow copy
      return span;
    }
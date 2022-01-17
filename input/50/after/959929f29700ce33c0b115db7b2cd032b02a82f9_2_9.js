function() {
      var args = [func].concat(slice.call(arguments, 0));
      return wrapper.apply(this, args);
    }
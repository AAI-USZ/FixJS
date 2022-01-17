function() {
      var args = [func].concat(slice.call(arguments));
      return wrapper.apply(this, args);
    }
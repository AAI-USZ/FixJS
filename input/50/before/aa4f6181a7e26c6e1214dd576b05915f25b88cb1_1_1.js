function(direction)
    {
      var classes = [this.__animation, direction];
      if (this.__reverse) {
        classes.push("reverse");
      }
      return classes;
    }
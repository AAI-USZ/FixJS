function(direction)
    {
      var classes = ["animationChild", this.__animation, direction];
      if (this.__reverse) {
        classes.push("reverse");
      }
      return classes;
    }
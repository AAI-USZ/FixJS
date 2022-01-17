function(map, precise) {
      // only init() if we get a map
      if (map) {
          this.init(map, precise);
          // allow (null, true) as constructor args
      } else if (arguments.length > 1) {
          this.precise = precise ? true : false;
      }
  }
function(name) {
      if (typeof(this.trackLists[name]) != undefined) {
        return this.trackLists[name];
      }
      else {
        return null;
      }
    }
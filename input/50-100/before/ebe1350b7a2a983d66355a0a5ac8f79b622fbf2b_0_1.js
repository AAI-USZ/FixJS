function(subset) {
      for (var i = 0; i < this.actual.length; i++) {
        var found = true;
        for (var j = 0; j < subset.length; j++)
          if (!Math.equalish(this.actual[i+j], subset[j]))
            found = false;
        if (found) return true;
      }
      
      return false;
    }
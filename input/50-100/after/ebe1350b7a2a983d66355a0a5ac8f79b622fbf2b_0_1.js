function(subset) {
      if (!this.actual.length)
        throw new Error("Use #toIncludishSubset with arrays and vectors, not scalars");
      for (var i = 0; i < this.actual.length; i++) {
        var found = true;
        for (var j = 0; j < subset.length; j++)
          if (!Math.equalish(this.actual[i+j], subset[j]))
            found = false;
        if (found) return true;
      }
      
      return false;
    }
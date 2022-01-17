function() {
      var suffix, num = this.abs(), last = parseInt(num.toString().slice(-2));
      return this + getOrdinalizedSuffix(last);
    }
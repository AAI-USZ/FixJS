function(amount, unit) {
      var v = unit ? unitSpace(amount, unit) : amount;
      if (this.as !== v.as) throw new Error('UnitSpace mismatch between ' + this.toString() + ' and ' + v.toString());
      return f.call(this, v);
    }
function(v) {
      ensureBasisMatch(this, v, 'adding', 'to');
      return new UnitedValue(this.factor + v.factor, basis);
    }
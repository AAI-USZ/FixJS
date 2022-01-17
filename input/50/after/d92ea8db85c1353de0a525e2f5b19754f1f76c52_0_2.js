function(v) {
      ensureBasisMatch(this, v, 'subtracting', 'from');
      return new UnitedValue(this.factor - v.factor, this.basis);
    }
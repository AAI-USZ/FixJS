function() {
      var params = ModelBase.prototype.getPreset.call(this);
      params.sunYears = this.getSunYears();
      return params;
    }
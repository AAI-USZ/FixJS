function() {
      var params = ModelBase.prototype.getPreset.call(this);
      params.params.sunYears = this.getSunYears();
      return params;
    }
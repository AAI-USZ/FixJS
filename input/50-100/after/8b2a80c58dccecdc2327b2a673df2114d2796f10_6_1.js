function() {
      var params = ModelBase.prototype.getPreset.call(this);
      params.params.Alpha = this.getAlpha();
      params.params.Beta = this.getBeta();
      params.params.Gamma = this.getGamma();
      return params;
    }
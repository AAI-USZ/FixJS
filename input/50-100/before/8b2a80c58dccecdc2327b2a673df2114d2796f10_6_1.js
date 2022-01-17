function() {
      var params = ModelBase.prototype.getPreset.call(this);
      params.Alpha = this.getAlpha();
      params.Beta = this.getBeta();
      params.Gamma = this.getGamma();
      return params;
    }
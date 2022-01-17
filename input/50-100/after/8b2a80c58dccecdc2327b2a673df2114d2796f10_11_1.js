function() {
      var params = ModelBase.prototype.getPreset.call(this);
      params.params.sphere[3].AxisAngle = this.getAlpha();
      params.params.betaRotate = this.getBeta();
      return params;
    }
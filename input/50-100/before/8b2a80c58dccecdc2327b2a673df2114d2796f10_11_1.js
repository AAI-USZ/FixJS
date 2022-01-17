function() {
      var params = ModelBase.prototype.getPreset.call(this);
      params.sphere[3].AxisAngle = this.getAlpha();
      params.betaRotate = this.getBeta();
      return params;
    }
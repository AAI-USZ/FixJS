function() {
      var params = ModelBase.prototype.getPreset.call(this);    
      params.params.equant = this.getEquant();
      params.params.deferentRadius = this.getRadiusDeferent();
      params.params.epicycleRadius = this.getRadiusEpicycle();
      params.params.baseRadius = this.getBaseRadius();
      params.params.apsidalAngle = this.ptolemySphere.getApsidalAngle();
      params.params.centuryStep = this.ptolemySphere.getApsidalSpeed();
      params.params.inclination = this.ptolemySphere.getInclination();
      params.params.deviation = this.getDeviation();
      params.params.km = this.getKM();
      params.params.lambdaAN = this.getLambdaAN();
      
      return params;
    }
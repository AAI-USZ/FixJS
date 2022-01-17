function() {
      var params = ModelBase.prototype.getPreset.call(this);    
      params.equant = this.getEquant();
      params.deferentRadius = this.getRadiusDeferent();
      params.epicycleRadius = this.getRadiusEpicycle();
      params.baseRadius = this.getBaseRadius();
      params.apsidalAngle = this.ptolemySphere.getApsidalAngle();
      params.centuryStep = this.ptolemySphere.getApsidalSpeed();
      params.inclination = this.ptolemySphere.getInclination();
      params.deviation = this.getDeviation();
      params.km = this.getKM();
      params.lambdaAN = this.getLambdaAN();
      
      return params;
    }
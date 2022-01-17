function(node) {
      ModelYavetz.prototype.setCurrentPlanet.call(this,node);
      this.setAlpha(this.currentPlanet.sphere[3].axisAngle);
      this.setBeta(this.currentPlanet.betaRotate);
    }
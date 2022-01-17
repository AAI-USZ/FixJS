function(node) {
      ModelYavetz.prototype.setCurrentPlanet.call(this,node);
      this.setBeta(this.currentPlanet.betaRotate);
    }
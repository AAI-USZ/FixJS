function(node) {
      ModelMoon.prototype.setCurrentPlanet.call(this,node);
      this.setMetonYear(this.currentPlanet.metonYear);
      this.setMetonSynodicMonths(this.currentPlanet.metonSynodicMonths);
      this.setMetonDays(this.currentPlanet.metonDays);
      this.setMetonDraconiticMonths(this.currentPlanet.metonDraconiticMonths);

    }
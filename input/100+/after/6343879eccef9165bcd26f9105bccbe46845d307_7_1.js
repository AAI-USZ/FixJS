function(params) {
    params.name = "ModelYavetz";
    params.spheres = 4;
    this.init(params);

    this.setAxisAngle0 = function(angle) {
        this.sphere[0].setAxisAngle(90 - angle);
    }

    this.alpha=0;
    this.getAlpha = function() {return this.alpha;}
    this.setAlpha = function(val) {
        this.alpha=val;
        this.sphere[2].setArcBeta(180-this.alpha);
        this.sphere[3].setAxisAngle(this.alpha);
    }


    this.beta=0;
    this.getBeta = function() {return this.beta;}
    this.setBeta = function(val) {
        this.beta=val;
        this.planet.setBeta(this.beta);
        this.sphere[3].setArcBeta(180-this.beta);
    }

    this.setSpeed2 = function(speed) {
        this.sphere[2].setSpeed(speed);
        this.sphere[3].setSpeed(-speed/2);
    }

    this.setCurrentPlanet = function(node) {
      ModelYavetz.prototype.setCurrentPlanet.call(this,node);
      this.setAlpha(this.currentPlanet.sphere[3].axisAngle);
      this.setBeta(this.currentPlanet.betaRotate);
    }

    this.update = function() {
        this.removeCurve(0);
        this.removeCurve(1);
        this.addCurve(0, this.sphere[0].curve, this.calcCurve(0, this.name + "Planet"), colors["Path"]);
        this.addCurve(1, this.sphere[1].curve, this.calcCurve(1, this.name + "Planet"), colors["Hippo"]);
        ModelYavetz.prototype.update.call(this);
    }
}
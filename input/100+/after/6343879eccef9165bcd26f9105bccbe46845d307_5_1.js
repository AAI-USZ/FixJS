function(params) {
    params.name = "ModelSimple";
    params.spheres = 2;
    this.init(params);

    this.sun.setEnabled(false);
    
    this.setAxisAngle0 = function(angle) {
        this.sphere[0].setAxisAngle(90 - angle);
    }

    this.updateHippo = function(step) {
        this.removeCurve(1);
        this.addCurve(1, this.sphere[1].curve, this.calcCurve(1, "Planet"), colors["Hippo"]);
    }

    this.update = function() {
        this.removeCurve(0);
        this.removeCurve(1);
        this.addCurve(0, this.curve, this.calcCurve(-1, this.name + "Planet"), colors["Path"]);
        this.addCurve(1, this.sphere[1].curve, this.calcCurve(1, this.name + "Planet"), colors["Hippo"]);
        ModelSimple.prototype.update.call(this);
    }

}
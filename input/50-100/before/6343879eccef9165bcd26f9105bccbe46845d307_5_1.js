function(params) {
    params.name = "ModelSimple";
    params.spheres = 2;
    this.init(params);

    this.setAxisAngle0 = function(angle) {
        this.sphere[0].setAxisAngle(90 - angle);
    }

    this.updateHippo = function(step) {
        this.removeCurve(1);
        this.addCurve(1, this.sphere[1].curve, this.calcCurve(1, "Planet"), colors["Hippo"]);
    }


}
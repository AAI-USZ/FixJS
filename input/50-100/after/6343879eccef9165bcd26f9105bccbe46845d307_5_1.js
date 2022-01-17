function() {
        this.removeCurve(0);
        this.removeCurve(1);
        this.addCurve(0, this.curve, this.calcCurve(-1, this.name + "Planet"), colors["Path"]);
        this.addCurve(1, this.sphere[1].curve, this.calcCurve(1, this.name + "Planet"), colors["Hippo"]);
        ModelSimple.prototype.update.call(this);
    }
function(params) {
    params.name = "ModelSun";
    params.spheres = 4;
    this.init(params);

    this.sun.setEnabled(false);

    this.setAxisAngle0 = function(angle) {
        this.sphere[0].setAxisAngle(90 - angle);
    }
    this.setSpeed2 = function(speed) {
        this.sunSpeed = (360.0 * this.sphere[1].getSpeed()) / (365.25 - this.sphere[1].getSpeed());
        model.sphere[2].setSpeed(this.sunSpeed);
        model.sphere[3].setSpeed(0);
    }

}
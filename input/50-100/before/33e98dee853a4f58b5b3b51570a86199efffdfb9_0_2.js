function(altitude) {
        this.targetAltitude = altitude;
        if (this.targetAltitude === null) {
            this.altitudeBug.hide();
        } else {
            this.altitudeBug.setY(this._calcAltitudeBugY());
            this.altitudeBug.show();
        }
        this.layer.draw();
    }
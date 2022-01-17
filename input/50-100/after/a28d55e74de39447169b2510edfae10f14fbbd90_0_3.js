function(altitude) {
        this.targetAltitude = altitude;
        if (this.targetAltitude === null) {
            this.altitudeBug.hide();
            this.targetAltitudeDisplay.hide();
        } else {
            this.altitudeBug.setY(this._calcAltitudeBugY());
            this.altitudeBug.show();
          this.targetAltitudeDisplay.setText(Math.round(altitude).toString());
            this.targetAltitudeDisplay.show();
        }
        //this.layer.draw();
    }
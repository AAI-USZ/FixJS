function(altitude) {
        this.altitude = altitude;
      this.altitudeInst.setText(Math.round(altitude).toString());
        this.altitudeTape.setY(altitude * 4);
        if (this.altitudeBug.isVisible()) {
            this.altitudeBug.setY(this._calcAltitudeBugY());
        }
        //this.layer.draw();
    }
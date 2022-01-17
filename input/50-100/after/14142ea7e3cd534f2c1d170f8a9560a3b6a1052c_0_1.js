function(altitude) {
        this.altitude = altitude;
        this.altitudeInst.setText(mmap.zeroPad(Math.round(altitude), 3, ' '));
        this.altitudeTape.setY(altitude * 4);
        if (this.altitudeBug.isVisible()) {
            this.altitudeBug.setY(this._calcAltitudeBugY());
        }
        this.layer.draw();
    }
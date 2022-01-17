function(altitude) {
        this.altitudeInst.setText(mmap.zeroPad(Math.round(altitude), 3, ' '));
        this.altitudeTape.setY(altitude * 4);
        this.layer.draw();
    }
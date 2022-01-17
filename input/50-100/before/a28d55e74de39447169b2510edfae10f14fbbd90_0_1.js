function(speed) {
        this.targetSpeed = speed;
        if (this.targetSpeed === null) {
            this.speedBug.hide();
            this.targetSpeedDisplay.hide();
        } else {
            this.speedBug.setY(this._calcSpeedBugY());
            this.speedBug.show();
            this.targetSpeedDisplay.setText(pfd.zeroPad(
                Math.round(speed), 4, ' '));
            this.targetSpeedDisplay.show();
        }
        //this.layer.draw();
    }
function(speed) {
        this.targetSpeed = speed;
        if (this.targetSpeed === null) {
            this.speedBug.hide();
            this.targetSpeedDisplay.hide();
        } else {
            this.speedBug.setY(this._calcSpeedBugY());
            this.speedBug.show();
            this.targetSpeedDisplay.setText(Math.round(speed).toString());
            this.targetSpeedDisplay.show();
        }
        //this.layer.draw();
    }
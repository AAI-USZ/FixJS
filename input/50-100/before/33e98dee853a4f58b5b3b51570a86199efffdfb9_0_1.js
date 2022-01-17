function(speed) {
        this.targetSpeed = speed;
        if (this.targetSpeed === null) {
            this.speedBug.hide();
        } else {
            this.speedBug.setY(this._calcSpeedBugY());
            this.speedBug.show();
        }
        this.layer.draw();
    }
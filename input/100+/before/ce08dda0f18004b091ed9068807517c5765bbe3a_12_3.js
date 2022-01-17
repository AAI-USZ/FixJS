function (target) {
        this._super(target);

        this._startAngle = target.getRotation();

        if (this._startAngle > 0) {
            this._startAngle = this._startAngle % 360.0;
        }
        else {
            this._startAngle = this._startAngle % 360.0;
        }

        this._diffAngle = this._dstAngle - this._startAngle;
        if (this._diffAngle > 180) {
            this._diffAngle -= 360;
        }

        if (this._diffAngle < -180) {
            this._diffAngle += 360;
        }
    }
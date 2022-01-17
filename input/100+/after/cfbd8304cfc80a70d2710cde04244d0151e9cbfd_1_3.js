function (target) {
        cc.ActionInterval.prototype.startWithTarget.call(this,target);

        this._startSkewX = target.getSkewX();


        if (this._startSkewX > 0) {
            this._startSkewX = this._startSkewX % 180;
        }
        else {
            this._startSkewX = this._startSkewX % -180;
        }

        this._deltaX = this._endSkewX - this._startSkewX;

        if (this._deltaX > 180) {
            this._deltaX -= 360;
        }
        if (this._deltaX < -180) {
            this._deltaX += 360;
        }


        this._startSkewY = target.getSkewY();
        if (this._startSkewY > 0) {
            this._startSkewY = this._startSkewY % 360;
        }
        else {
            this._startSkewY = this._startSkewY % -360;
        }

        this._deltaY = this._endSkewY - this._startSkewY;

        if (this._deltaY > 180) {
            this._deltaY -= 360;
        }
        if (this._deltaY < -180) {
            this._deltaY += 360;
        }
    }
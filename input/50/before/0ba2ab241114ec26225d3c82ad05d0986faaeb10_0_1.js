function (time) {
        if (this._target) {
            this._target.setScaleX(this._startScaleX + this._deltaX * time);
            this._target.setScaleY(this._startScaleY + this._deltaY * time);
        }
    }
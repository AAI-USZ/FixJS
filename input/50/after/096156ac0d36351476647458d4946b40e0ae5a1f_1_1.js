function (touches, event) {
        this._lastLocation = touches[0].getLocation();
        return true;
    }
function () {
        if (this._isAccelerometerEnabled) {
            cc.Director.sharedDirector().getAccelerometer().setDelegate(this);
        }
        this._super();
    }
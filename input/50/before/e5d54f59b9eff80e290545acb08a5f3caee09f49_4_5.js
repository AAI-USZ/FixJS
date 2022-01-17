function () {
        if (this._isAccelerometerEnabled) {
            cc.Accelerometer.sharedAccelerometer().setDelegate(this);
        }
        this._super();
    }
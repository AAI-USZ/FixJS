function (enabled) {
        if (enabled != this._isAccelerometerEnabled) {
            this._isAccelerometerEnabled = enabled;

            if (this._isRunning) {
                if (enabled) {
                    cc.Accelerometer.sharedAccelerometer().setDelegate(this);
                }
                else {
                    cc.Accelerometer.sharedAccelerometer().setDelegate(null);
                }
            }
        }
    }
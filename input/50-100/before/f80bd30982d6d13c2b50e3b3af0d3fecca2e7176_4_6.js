function () {
        if (this._isTouchEnabled) {
            cc.TouchDispatcher.sharedDispatcher().removeDelegate(this);
        }

        // remove this layer from the delegates who concern Accelerometer Sensor
        if (this._isAccelerometerEnabled) {
            cc.Accelerometer.sharedAccelerometer().setDelegate(null);
        }

        // remove this layer from the delegates who concern the kaypad msg
        if (this._isKeypadEnabled) {
            cc.KeypadDispatcher.sharedDispatcher().removeDelegate(this);
        }

        this._super();
    }
function () {
        var director = cc.Director.sharedDirector();
        if (this._isTouchEnabled) {
            director.getTouchDispatcher().removeDelegate(this);
        }

        // remove this layer from the delegates who concern Accelerometer Sensor
        if (this._isAccelerometerEnabled) {
            director.getAccelerometer().setDelegate(null);
        }

        // remove this layer from the delegates who concern the kaypad msg
        if (this._isKeypadEnabled) {
            director.getKeypadDispatcher().removeDelegate(this);
        }

        this._super();
    }
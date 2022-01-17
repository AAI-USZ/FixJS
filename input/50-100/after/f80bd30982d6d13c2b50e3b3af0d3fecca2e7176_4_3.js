function (enabled) {
        if (enabled != this._isAccelerometerEnabled) {
            this._isAccelerometerEnabled = enabled;

            if (this._isRunning) {
                var director = cc.Director.sharedDirector();
                if (enabled) {
                    director.getAccelerometer().setDelegate(this);
                } else {
                    director.getAccelerometer().setDelegate(null);
                }
            }
        }
    }
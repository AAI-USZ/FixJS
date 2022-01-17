function () {
        // register 'parent' nodes first
        // since events are propagated in reverse order
        if (this._isTouchEnabled) {
            this.registerWithTouchDispatcher();
        }

        // then iterate over all the children
        this._super();

        // add this layer to concern the Accelerometer Sensor
        if (this._isAccelerometerEnabled) {
            cc.Accelerometer.sharedAccelerometer().setDelegate(this);
        }

        // add this layer to concern the kaypad msg
        if (this._isKeypadEnabled) {
            cc.KeypadDispatcher.sharedDispatcher().addDelegate(this);
        }
    }
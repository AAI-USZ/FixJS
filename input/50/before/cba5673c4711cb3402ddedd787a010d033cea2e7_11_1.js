function (sender) {
        cc.Director.sharedDirector().setDeviceOrientation(cc.DEVICE_ORIENTATION_PORTRAIT);
        this._super(sender);
    }
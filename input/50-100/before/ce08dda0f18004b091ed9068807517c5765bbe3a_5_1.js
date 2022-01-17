function () {
        var tmp = this._winSizeInPoints;
        if (this._deviceOrientation == cc.DEVICE_ORIENTATION_LANDSCAPE_LEFT || this._deviceOrientation == cc.DEVICE_ORIENTATION_LANDSCAPE_RIGHT) {
            // swap x,y in landspace mode
            var size = new cc.SizeZero();
            size.width = tmp.height;
            size.height = tmp.width;
            return size;
        }
        return tmp;
    }
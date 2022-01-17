function (point) {
        var s = this._winSizeInPoints;
        var newY = s.height - point.y;
        var newX = s.width - point.x;

        var ret = cc.PointZero();
        switch (this._deviceOrientation) {
            case cc.DEVICE_ORIENTATION_PORTRAIT:
                ret = cc.ccp(point.x, newY);
                break;
            case cc.DEVICE_ORIENTATION_PORTRAIT_UPSIDE_DOWN:
                ret = cc.ccp(newX, point.y);
                break;
            case cc.DEVICE_ORIENTATION_LANDSCAPE_LEFT:
                ret.x = point.y;
                ret.y = point.x;
                break;
            case cc.DEVICE_ORIENTATION_LANDSCAPE_RIGHT:
                ret.x = newY;
                ret.y = newX;
                break;
        }
        return ret;
    }
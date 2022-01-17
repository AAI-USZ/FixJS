function (point) {
        var winSize = this._winSizeInPoints;
        var oppositeX = winSize.width - point.x;
        var oppositeY = winSize.height - point.y;
        var uiPoint = cc.PointZero();

        switch (this._deviceOrientation) {
            case cc.DEVICE_ORIENTATION_PORTRAIT:
                uiPoint = cc.ccp(point.x, oppositeY);
                break;
            case cc.DEVICE_ORIENTATION_PORTRAIT_UPSIDE_DOWN:
                uiPoint = cc.ccp(oppositeX, point.y);
                break;
            case cc.DEVICE_ORIENTATION_LANDSCAPE_LEFT:
                uiPoint = cc.ccp(point.y, point.x);
                break;
            case cc.DEVICE_ORIENTATION_LANDSCAPE_RIGHT:
                // Can't use oppositeX/Y because x/y are flipped
                uiPoint = cc.ccp(winSize.width - point.y, winSize.height - point.x);
                break;
        }
        return uiPoint;

    }
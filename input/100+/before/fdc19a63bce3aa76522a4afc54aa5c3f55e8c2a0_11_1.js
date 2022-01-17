function () {
        if (this._super()) {
            this.setIsTouchEnabled(true);
            var s = cc.Director.sharedDirector().getWinSize();
            this._isRelativeAnchorPoint = false;
            this.setAnchorPoint(cc.ccp(0.5, 0.5));
            this.setContentSize(s);
            var r = new cc.Rect();
            cc.Application.sharedApplication().statusBarFrame(r);
            var orientation = cc.Director.sharedDirector().getDeviceOrientation();
            if (orientation == cc.DEVICE_ORIENTATION_LANDSCAPE_LEFT || orientation == cc.DEVICE_ORIENTATION_LANDSCAPE_RIGHT) {
                s.height -= r.size.width;
            }
            else {
                s.height -= r.size.height;
            }
            this.setPosition(cc.ccp(s.width / 2, s.height / 2));
            this._selectedItem = null;
            this._state = cc.CCMENU_STATE_WAITING;
            return true;
        }
        return false;
    }
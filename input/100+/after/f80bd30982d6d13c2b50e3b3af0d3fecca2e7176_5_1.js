function () {
        if (this._super()) {
            this.setTouchEnabled(true);
            var s = cc.Director.sharedDirector().getWinSize();

            this.setAnchorPoint(cc.ccp(0.5, 0.5));
            this.setContentSize(s);
            var r = new cc.Rect();
            cc.Application.sharedApplication().statusBarFrame(r);
            this.setPosition(cc.ccp(s.width / 2, s.height / 2));
            this._selectedItem = null;
            this._state = cc.CCMENU_STATE_WAITING;
            return true;
        }
        return false;
    }
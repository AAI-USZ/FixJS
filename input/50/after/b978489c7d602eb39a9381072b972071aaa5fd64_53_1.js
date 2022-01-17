function (touches, event) {
        if (!this.isMouseDown) {
            //this._beginPos = cc.ccp(touches[0].locationInView().x, touches[0].locationInView().y);
            this._beginPos = touches[0].locationInView().y;
        }
        this.isMouseDown = true;
    }
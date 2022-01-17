function (touches, event) {
        if (!this.isMouseDown) {
            //this._beginPos = cc.ccp(touches[0].locationInView(0).x, touches[0].locationInView(0).y);
            this._beginPos = touches[0].locationInView(0).y;
        }
        this.isMouseDown = true;
    }
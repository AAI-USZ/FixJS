function (touch, event) {

        if (this._prevLocation == null) {
            this._prevLocation = touch.locationInView(touch.view());
            return;
        }

        var touchLocation = touch.locationInView(touch.view());
        //var prevLocation = touch.previousLocationInView(touch.view());

        //touchLocation = cc.Director.sharedDirector().convertToGL(touchLocation);
        //prevLocation = cc.PointZero()//cc.Director.sharedDirector().convertToGL(prevLocation);

        var diff = cc.ccpSub(touchLocation, this._prevLocation);

        this._prevLocation = cc.ccp(touchLocation.x, touchLocation.y);


        var node = this.getChildByTag(TAG_NODE);
        var currentPos = node.getPosition();
        node.setPosition(cc.ccpAdd(currentPos, diff));
    }
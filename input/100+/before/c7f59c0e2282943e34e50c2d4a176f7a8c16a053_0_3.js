function (touches, event) {

        if (this._prevLocation == null) {
            this._prevLocation = touch.locationInView();
            return;
        }

        var touchLocation = touch.locationInView();
        //var prevLocation = touch.previousLocationInView();

        //touchLocation = cc.Director.sharedDirector().convertToGL(touchLocation);
        //prevLocation = cc.PointZero()//cc.Director.sharedDirector().convertToGL(prevLocation);

        var diff = cc.pSub(touchLocation, this._prevLocation);

        this._prevLocation = cc.p(touchLocation.x, touchLocation.y);


        var node = this.getChildByTag(TAG_NODE);
        var currentPos = node.getPosition();
        node.setPosition(cc.pAdd(currentPos, diff));
    }
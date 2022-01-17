function (touch, event) {
        var touchLocation = touch.locationInView(touch.view());

        if (!this.prevLocation) {
            this.prevLocation = cc.ccp(touchLocation.x, touchLocation.y);
            return;
        }
        var node = this.getChildByTag(TAG_TILE_MAP);
        var diff = cc.ccpSub(touchLocation, this.prevLocation);
        var currentPos = node.getPosition();

        //diff = cc.ccp(diff.x * node.getScaleX(),diff.y * node.getScaleY());
        var curPos = cc.ccpAdd(currentPos, diff);
        node.setPosition(curPos);
        this.prevLocation = cc.ccp(touchLocation.x, touchLocation.y);
    }
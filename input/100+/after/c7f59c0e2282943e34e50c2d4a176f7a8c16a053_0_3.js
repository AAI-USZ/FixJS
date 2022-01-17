function (touches, event) {

        if (this._prevLocation == null) {
            this._prevLocation = director.convertTouchToGL( touches[0] );
            return;
        }

        var touchLocation = director.convertTouchToGL( touches[0] );

        var diff = cc.pSub(touchLocation, this._prevLocation);

        this._prevLocation = touchLocation;

        var node = this.getChildByTag(TAG_NODE);
        var currentPos = node.getPosition();
        node.setPosition(cc.pAdd(currentPos, diff));
    }
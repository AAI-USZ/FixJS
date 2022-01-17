function (touch, event) {
        var location = touch.locationInView();
        //CCPoint convertedLocation = CCDirector::sharedDirector().convertToGL(location);

        var pos = cc.PointZero();
        if (this._background) {
            pos = this._background.convertToWorldSpace(cc.PointZero());
        }
        this._emitter.setPosition(cc.ccpSub(location, pos));
    }
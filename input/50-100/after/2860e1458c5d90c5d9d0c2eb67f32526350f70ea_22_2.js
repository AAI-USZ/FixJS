function (touch, event) {
        // If it weren't for the TouchDispatcher, you would need to keep a reference
        // to the touch from touchBegan and check that the current touch is the same
        // as that one.
        // Actually, it would be even more complicated since in the Cocos dispatcher
        // you get CCSets instead of 1 UITouch, so you'd need to loop through the set
        // in each touchXXX method.
        cc.Assert(this._state == PADDLE_STATE_GRABBED, "Paddle - Unexpected state!");

        var touchPoint = touch.locationInView();
        //touchPoint = cc.Director.sharedDirector().convertToGL( touchPoint );

        this.setPosition(cc.PointMake(touchPoint.x, this.getPosition().y));
    }
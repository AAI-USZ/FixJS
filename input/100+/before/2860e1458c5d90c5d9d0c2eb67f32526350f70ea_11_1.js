function (touches, event) {
        if (this.isMouseDown) {
            var touchLocation = touches[0].locationInView(0);
            var nMoveY = touchLocation.y - this._beginPos.y;
            var curPos = this._itmeMenu.getPosition();

            var nextPos = cc.ccp(curPos.x, curPos.y + nMoveY);
            var winSize = cc.Director.sharedDirector().getWinSize();
            if (nextPos.y < 0.0) {
                this._itmeMenu.setPosition(cc.PointZero());
                return;
            }

            if (nextPos.y > ((this._testCount + 1) * LINE_SPACE - winSize.height)) {
                this._itmeMenu.setPosition(cc.ccp(0, ((this._testCount + 1) * LINE_SPACE - winSize.height)));
                return;
            }

            this._itmeMenu.setPosition(nextPos);

            this._beginPos = cc.ccp(0, touchLocation.y);
        }
    }
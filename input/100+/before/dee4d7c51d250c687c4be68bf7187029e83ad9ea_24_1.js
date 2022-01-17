function (touches, event) {
        if (this.isMouseDown) {
            var touchLocation = touches[0].locationInView(0).y;
            var nMoveY = touchLocation - this._beginPos;
            curPos = cc.ccp(this._itemMenu.getPosition().x, this._itemMenu.getPosition().y);

            var nextPos = cc.ccp(curPos.x, curPos.y + nMoveY);
            var winSize = cc.Director.sharedDirector().getWinSize();
            if (nextPos.y < 0.0) {
                this._itemMenu.setPosition(cc.PointZero());
                return;
            }

            if (nextPos.y > ((testNames.length + 1) * LINE_SPACE - winSize.height)) {
                this._itemMenu.setPosition(cc.ccp(0, ((testNames.length + 1) * LINE_SPACE - winSize.height)));
                return;
            }
            this._itemMenu.setPosition(nextPos);
            this._beginPos = cc.ccp(0, touchLocation).y;
            curPos = nextPos;
        }
    }
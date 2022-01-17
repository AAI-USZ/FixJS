function (followedNode, rect) {
        cc.Assert(followedNode != null, "");
        this._followedNode = followedNode;
        this._boundarySet = false;
        this._boundaryFullyCovered = false;

        var winSize = cc.Director.sharedDirector().getWinSize();
        this._fullScreenSize = cc.PointMake(winSize.width, winSize.height);
        this._halfScreenSize = cc.ccpMult(this._fullScreenSize, 0.5);

        if (rect) {
            this.leftBoundary = -((rect.origin.x + rect.size.width) - this._fullScreenSize.x);
            this.rightBoundary = -rect.origin.x;
            this.topBoundary = -rect.origin.y;
            this.bottomBoundary = -((rect.origin.y + rect.size.height) - this._fullScreenSize.y);

            if (this.rightBoundary < this.leftBoundary) {
                // screen width is larger than world's boundary width
                //set both in the middle of the world
                this.rightBoundary = this.leftBoundary = (this.leftBoundary + this.rightBoundary) / 2;
            }
            if (this.topBoundary < this.bottomBoundary) {
                // screen width is larger than world's boundary width
                //set both in the middle of the world
                this.topBoundary = this.bottomBoundary = (this.topBoundary + this.bottomBoundary) / 2;
            }

            if ((this.topBoundary == this.bottomBoundary) && (this.leftBoundary == this.rightBoundary)) {
                this._boundaryFullyCovered = true;
            }
        }
        return true;
    }
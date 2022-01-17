function (touch) {
        var touchLocation = touch.locationInView(touch.view());
        //console.log("touchLocation",touchLocation)
        if (this._children && this._children.length > 0) {
            for (var i = 0; i < this._children.length; i++) {
                if (this._children[i].getIsVisible() && this._children[i].getIsEnabled()) {
                    var local = this._children[i].convertToNodeSpace(touchLocation);
                    var r = this._children[i].rect();
                    r.origin = cc.PointZero();
                    if (cc.Rect.CCRectContainsPoint(r, local)) {
                        return this._children[i];
                    }
                }
            }

        }

        return null;
    }
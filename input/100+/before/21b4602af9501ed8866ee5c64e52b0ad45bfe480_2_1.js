function (touch) {
        var touchLocation = touch.locationInView();

        if (this._children && this._children.length > 0) {
            for (var i = 0; i < this._children.length; i++) {
                if (this._children[i].isVisible() && this._children[i].isEnabled()) {
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
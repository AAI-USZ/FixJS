function () {
        var rect = cc.RectMake(0, 0, this._contentSize.width, this._contentSize.height);
        rect = cc.RectApplyAffineTransform(rect, this.nodeToWorldTransform());
        rect = new cc.Rect(0 | rect.origin.x - 4, 0 | rect.origin.y - 4, 0 | rect.size.width + 8, 0 | rect.size.height + 8);
        //query child's boundingBox
        if (!this._children)
            return rect;

        for (var i = 0; i < this._children.length; i++) {
            var child = this._children[i];
            if (child && child._isVisible) {
                var childRect = child.boundingBoxToWorld();
                if (childRect) {
                    rect = cc.Rect.CCRectUnion(rect, childRect);
                }
            }
        }
        return rect;
    }
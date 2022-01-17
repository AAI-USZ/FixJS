function (info) {
        cc.Log("TextInputTest:keyboardWillShowAt(origin:" + info.end.origin.x + "," + info.end.origin.y
            + ", size:" + info.end.size.width + "," + info.end.size.height + ")");

        if (!this._pTrackNode) {
            return;
        }

        var rectTracked = textInputGetRect(this._pTrackNode);
        cc.Log("TextInputTest:trackingNodeAt(origin:" + info.end.origin.x + "," + info.end.origin.y
            + ", size:" + info.end.size.width + "," + info.end.size.height + ")");

        // if the keyboard area doesn't intersect with the tracking node area, nothing need to do.
        if (!cc.Rect.CCRectIntersectsRect(rectTracked, info.end)) {
            return;
        }

        // assume keyboard at the bottom of screen, calculate the vertical adjustment.
        var adjustVert = cc.Rect.CCRectGetMaxY(info.end) - cc.Rect.CCRectGetMinY(rectTracked);
        cc.Log("TextInputTest:needAdjustVerticalPosition(" + adjustVert + ")");

        // move all the children node of KeyboardNotificationLayer
        var children = this.getChildren();
        for (var i = 0; i < children.length; ++i) {
            var node = children[i];
            var pos = node.getPosition();
            pos.y += adjustVert;
            node.setPosition(pos);
        }
    }
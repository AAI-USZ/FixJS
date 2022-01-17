function (touch, event) {
        if (!this._pTrackNode) {
            return;
        }

        var endPos = touch.getLocation();
        endPos = cc.Director.getInstance().convertToGL(endPos);

        var delta = 5.0;
        if (Math.abs(endPos.x - this._beginPos.x) > delta
            || Math.abs(endPos.y - this._beginPos.y) > delta) {
            // not click
            this._beginPos.x = this._beginPos.y = -1;
            return;
        }

        // decide the trackNode is clicked.
        var point = this.convertTouchToNodeSpaceAR(touch);
        //var point = endPos;
        cc.Log("KeyboardNotificationLayer:clickedAt(" + point.x + "," + point.y + ")");

        var rect = textInputGetRect(this._pTrackNode);
        cc.Log("KeyboardNotificationLayer:TrackNode at(origin:" + rect.origin.x + "," + rect.origin.y
            + ", size:" + rect.size.width + "," + rect.size.height + ")");

        this.onClickTrackNode(cc.Rect.CCRectContainsPoint(rect, point));
        cc.Log("----------------------------------");
    }
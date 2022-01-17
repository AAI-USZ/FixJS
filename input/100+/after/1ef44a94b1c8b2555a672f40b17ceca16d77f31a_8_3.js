function (point) {
        var newY = this._winSizeInPoints.height - point.y;
        return new cc.Point(point.x, newY);
    }
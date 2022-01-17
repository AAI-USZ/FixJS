function (point) {
        var oppositeY = this._winSizeInPoints.height - point.y;
        return new cc.Point(point.x,oppositeY);
    }
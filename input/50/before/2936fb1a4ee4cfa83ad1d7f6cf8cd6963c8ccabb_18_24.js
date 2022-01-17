function (touch) {
        var point = touch.locationInView(touch.view());
        point = cc.Director.sharedDirector().convertToGL(point);
        return this.convertToNodeSpaceAR(point);
    }
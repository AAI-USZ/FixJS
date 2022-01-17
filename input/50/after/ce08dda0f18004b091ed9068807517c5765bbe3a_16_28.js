function (touch) {
        var point = touch.locationInView();
        point = cc.Director.sharedDirector().convertToGL(point);
        return this.convertToNodeSpace(point);
    }
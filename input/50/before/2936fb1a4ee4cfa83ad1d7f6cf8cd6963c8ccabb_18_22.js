function (nodePoint) {
        var worldPoint = new cc.Point();
        worldPoint = this.convertToWorldSpace(nodePoint);
        return cc.Director.sharedDirector().convertToUI(worldPoint);
    }
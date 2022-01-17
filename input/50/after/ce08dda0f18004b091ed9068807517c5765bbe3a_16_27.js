function (nodePoint) {
        var worldPoint = this.convertToWorldSpace(nodePoint);
        return cc.Director.sharedDirector().convertToUI(worldPoint);
    }
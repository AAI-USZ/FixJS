function (batchNode, rect) {
        if (this.initWithTexture(batchNode.getTexture(), rect)) {
            this.useBatchNode(batchNode);
            return true;
        }
        return false;
    }
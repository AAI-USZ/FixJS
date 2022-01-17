function () {
        var s = cc.Director.sharedDirector().getWinSize();

        // increase nodes
        if (this._currentQuantityOfNodes < this._quantityOfNodes) {
            for (var i = 0; i < (this._quantityOfNodes - this._currentQuantityOfNodes); i++) {
                var sprite = cc.Sprite.createWithTexture(this._batchNode.getTexture(), cc.RectMake(0, 0, 32, 32));
                this._batchNode.addChild(sprite);
                sprite.setPosition(cc.ccp(cc.RANDOM_0_1() * s.width, cc.RANDOM_0_1() * s.height));
                sprite.setVisible(false);
            }
        }
        // decrease nodes
        else if (this._currentQuantityOfNodes > this._quantityOfNodes) {
            for (var i = 0; i < (this._currentQuantityOfNodes - this._quantityOfNodes); i++) {
                var index = this._currentQuantityOfNodes - i - 1;
                this._batchNode.removeChildAtIndex(index, true);
            }
        }

        this._currentQuantityOfNodes = this._quantityOfNodes;
    }
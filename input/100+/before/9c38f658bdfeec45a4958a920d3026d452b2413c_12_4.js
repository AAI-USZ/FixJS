function (aZ) {
        var sprite = cc.Sprite.createWithBatchNode(this._batchNode, cc.RectMake(128, 0, 64, 64));
        this._batchNode.addChild(sprite, aZ + 1, 0);

        //children
        var spriteShadow = cc.Sprite.createWithBatchNode(this._batchNode, cc.RectMake(0, 0, 64, 64));
        spriteShadow.setOpacity(128);
        sprite.addChild(spriteShadow, aZ, 3);

        var spriteTop = cc.Sprite.createWithBatchNode(this._batchNode, cc.RectMake(64, 0, 64, 64));
        sprite.addChild(spriteTop, aZ + 2, 3);

        return sprite;
    }
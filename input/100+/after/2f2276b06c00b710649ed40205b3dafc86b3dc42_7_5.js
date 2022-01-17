function (dt) {
        //srandom(0);

        // 15 percent
        var totalToAdd = this._currentQuantityOfNodes * 0.15;

        if (totalToAdd > 0) {
            var sprites = [];

            // Don't include the sprite creation time as part of the profiling
            for (var i = 0; i < totalToAdd; i++) {
                var sprite = cc.Sprite.createWithTexture(this._batchNode.getTexture(), cc.RectMake(0, 0, 32, 32));
                sprites.push(sprite);
            }

            // add them with random Z (very important!)
            for (var i = 0; i < totalToAdd; i++) {
                this._batchNode.addChild(sprites[i], cc.RANDOM_MINUS1_1() * 50, TAG_BASE + i);
            }

            //		[this._batchNode sortAllChildren];

            // reorder them
            if (cc.ENABLE_PROFILERS) {
                cc.ProfilingBeginTimingBlock(this._profilingTimer);
            }

            for (var i = 0; i < totalToAdd; i++) {
                var node = this._batchNode.getChildren()[i];
                ;
                this._batchNode.reorderChild(node, cc.RANDOM_MINUS1_1() * 50);
            }
            if (cc.ENABLE_PROFILERS) {
                cc.ProfilingEndTimingBlock(this._profilingTimer);
            }
        }


        // remove them
        for (var i = 0; i < totalToAdd; i++) {
            this._batchNode.removeChildByTag(TAG_BASE + i, true);
        }

    }
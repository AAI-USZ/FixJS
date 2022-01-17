function (dt) {
            // reset seed
            //srandom(0);

            // 15 percent
            var totalToAdd = this._currentQuantityOfNodes * 0.15;

            if (totalToAdd > 0) {
                var sprites = [];
                var zs = [];

                // Don't include the sprite creation time and random as part of the profiling
                for (var i = 0; i < totalToAdd; i++) {
                    var sprite = cc.Sprite.spriteWithTexture(this._batchNode.getTexture(), cc.RectMake(0, 0, 32, 32));
                    sprites.push(sprite);
                    zs[i] = cc.RANDOM_MINUS1_1() * 50;
                }

                // add them with random Z (very important!)
                if (cc.ENABLE_PROFILERS)
                    cc.ProfilingBeginTimingBlock(this._profilingTimer);
            }

            for (var i = 0; i < totalToAdd; i++) {
                this._batchNode.addChild(sprites[i], zs[i], TAG_BASE + i);
            }

            if (cc.ENABLE_PROFILERS) {
                cc.ProfilingEndTimingBlock(this._profilingTimer);
            }

            // remove them
            for (var i = 0; i < totalToAdd; i++) {
                this._batchNode.removeChildByTag(TAG_BASE + i, true);
            }

            delete zs;

        }
function (child, z, aTag) {
        cc.Assert(child != null, "SpriteBatchNode.addQuadFromSprite():Argument must be non-nil");
        /// @todo CCAssert( [child isKindOfClass:[CCSprite class]], @"CCSpriteSheet only supports CCSprites as children");

        // quad index is Z
        child.setAtlasIndex(z);

        // XXX: optimize with a binary search
        var i = 0;
        if (this._descendants && this._descendants.length > 0) {
            var obj = null;
            for (var index = 0; index < this._descendants.length; index++) {
                obj = this._descendants[index];
                if (obj && (obj.getAtlasIndex() >= z)) {
                    ++i;
                }
            }
        }
        this._descendants = cc.ArrayAppendObjectToIndex(this._descendants, child, i);

        // IMPORTANT: Call super, and not self. Avoid adding it to the texture atlas array
        this.addChild(child, z, aTag, true);
        //CCNode::addChild(child, z, aTag);
        return this;
    }
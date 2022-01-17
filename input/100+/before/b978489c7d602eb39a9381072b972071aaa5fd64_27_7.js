function (child, zOrder, tag) {
        switch (arguments.length) {
            case 1:
                this._super(child);
                break;
            case 2:
                this._super(child, zOrder);
                break;
            case 3:
                cc.Assert(child != null, "SpriteBatchNode.addChild():child should not be null");

                var sprite = child;
                // check CCSprite is using the same texture id
                if (cc.renderContextType != cc.CANVAS) {
                    cc.Assert(sprite.getTexture().getName() == this._textureAtlas.getTexture().getName(),
                        "SpriteBatchNode.addChild():check CCSprite is using the same texture id");
                }

                this._super(child, zOrder, tag);

                var index = this.atlasIndexForChild(sprite, zOrder);
                this.insertChild(sprite, index);
                break;
            case 4:
                if (arguments[3]) {
                    this._super(child, zOrder, tag);
                }
                break;
            default:
                throw "Argument must be non-nil ";
                break;
        }

        //this._addDirtyRegionToDirector(this.boundingBoxToWorld());
        this.setNodeDirty();
    }
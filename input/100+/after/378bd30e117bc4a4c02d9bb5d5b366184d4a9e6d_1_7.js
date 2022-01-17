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
                cc.Assert(!(child instanceof cc.Sprite), "cc.SpriteBatchNode only supports cc.Sprites as children");

                // check CCSprite is using the same texture id
                if (cc.renderContextType != cc.CANVAS) {
                    cc.Assert(child.getTexture().getName() == this._textureAtlas.getTexture().getName(),
                        "SpriteBatchNode.addChild():check cc.Sprite is using the same texture id");
                }
                this._super(child, zOrder, tag);
                this.appendChild(child);
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
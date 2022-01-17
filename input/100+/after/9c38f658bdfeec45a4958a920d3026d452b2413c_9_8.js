function (child, zOrder, tag) {
        var argnum = arguments.length;
        switch (argnum) {
            case 1:
                this._super(child);
                break;
            case 2:
                this._super(child, zOrder);
                break;
            case 3:
                cc.Assert(child != null, "Argument must be non-NULL");
                if (cc.renderContextType == cc.WEBGL) {
                    //TODO
                    if (this._batchNode) {
                        cc.Assert((child instanceof cc.Sprite), "cc.Sprite only supports cc.Sprites as children when using cc.SpriteBatchNode");
                        cc.Assert(child.getTexture().getName() == this._textureAtlas.getTexture().getName(), "");

                        //put it in descendants array of batch node
                        this._batchNode.appendChild(child);
                        if (!this._reorderChildDirty) {
                            this._setReorderChildDirtyRecursively();
                        }
                    }
                }

                //cc.Node already sets isReorderChildDirty_ so this needs to be after batchNode check
                this._super(child, zOrder, tag);
                this._hasChildren = true;
                break;
            default:
                throw "Sprite.addChild():Argument must be non-nil ";
                break;
        }
    }
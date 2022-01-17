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
                cc.Assert(child != null, "");
                this._super(child, zOrder, tag);

                if (cc.renderContextType == cc.WEBGL) {
                    if (this._usesBatchNode) {
                        cc.Assert(child.getTexture().getName() == this._textureAtlas.getTexture().getName(), "");
                        var index = this._batchNode.atlasIndexForChild(child, zOrder);
                        this._batchNode._insertChild(child, index);
                    }
                    this._hasChildren = true;
                }
                break;
            default:
                throw "Sprite.addChild():Argument must be non-nil ";
                break;
        }
    }
function (texture, rect, rotated) {
        var argnum = arguments.length;
        if (argnum == 0)
            throw "Sprite.initWithTexture(): Argument must be non-nil ";

        rotated = rotated || false;

        this._batchNode = null;
        //this.setShaderProgram(CCShaderCache::sharedShaderCache()->programForKey(kCCShader_PositionTextureColor));

        this._recursiveDirty = false;
        this.setDirty(false);
        this._opacityModifyRGB = true;
        this._opacity = 255;
        this._color = cc.WHITE();
        this._colorUnmodified = cc.WHITE();

        this._blendFunc.src = cc.BLEND_SRC;
        this._blendFunc.dst = cc.BLEND_DST;

        this._flipX = this._flipY = false;

        // default transform anchor: center
        this.setAnchorPoint(new cc.Point(0.5, 0.5));

        // zwoptex default values
        this._offsetPosition = new cc.Point(0, 0);
        this._hasChildren = false;

        // Atlas: Color
        var tmpColor = new cc.Color4B(255, 255, 255, 255);
        this._quad.bl.colors = tmpColor;
        this._quad.br.colors = tmpColor;
        this._quad.tl.colors = tmpColor;
        this._quad.tr.colors = tmpColor;

        if (!rect) {
            rect = new cc.Rect();
            if (texture instanceof cc.Texture2D)
                rect.size = texture.getContentSize();
            else if ((texture instanceof HTMLImageElement) || (texture instanceof HTMLCanvasElement))
                rect.size = new cc.Size(texture.width, texture.height);
        }

        if (cc.renderContextType == cc.CANVAS) {
            this._originalTexture = texture;
        }

        this.setTexture(texture);
        this.setTextureRect(cc.RectZero(), rotated, cc.SizeZero());

        // by default use "Self Render".
        // if the sprite is added to a batchnode, then it will automatically switch to "batchnode Render"
        this.setBatchNode(null);

        return true;
    }
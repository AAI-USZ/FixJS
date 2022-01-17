function () {
        this._dirty = this._recursiveDirty = false;
        // by default use "Self Render".
        // if the sprite is added to an batchnode, then it will automatically switch to "SpriteSheet Render"
        this.useSelfRender();

        this._opacityModifyRGB = true;
        this._opacity = 255;
        this._color = cc.WHITE();
        this._colorUnmodified = cc.WHITE();

        this._blendFunc.src = cc.BLEND_SRC;
        this._blendFunc.dst = cc.BLEND_DST;

        // update texture (calls _updateBlendFunc)
        this.setTexture(null);

        this._flipX = this._flipY = false;

        // default transform anchor: center
        this.setAnchorPoint(cc.ccp(0.5, 0.5));

        // zwoptex default values
        this._offsetPositionInPixels = cc.PointZero();

        this._honorParentTransform = cc.HONOR_PARENT_TRANSFORM_ALL;
        this._hasChildren = false;

        // Atlas: Color
        var tmpColor = new cc.Color4B(255, 255, 255, 255);
        this._quad.bl.colors = tmpColor;
        this._quad.br.colors = tmpColor;
        this._quad.tl.colors = tmpColor;
        this._quad.tr.colors = tmpColor;

        // Atlas: Vertex
        // updated in "useSelfRender"
        // Atlas: TexCoords
        this.setTextureRectInPixels(cc.RectZero(), false, cc.SizeZero());

        return true;
    }
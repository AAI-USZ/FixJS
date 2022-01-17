function (texture) {
        // CCSprite: setTexture doesn't work when the sprite is rendered using a CCSpriteSheet
        if (cc.renderContextType != cc.CANVAS) {
            cc.Assert(!this._usesBatchNode, "setTexture doesn't work when the sprite is rendered using a CCSpriteSheet");
        }

        // we can not use RTTI, so we do not known the type of object
        // accept texture==nil as argument
        /*cc.Assert((! texture) || dynamic_cast<CCTexture2D*>(texture));*/

        this._texture = texture;
        this._updateBlendFunc();
    }
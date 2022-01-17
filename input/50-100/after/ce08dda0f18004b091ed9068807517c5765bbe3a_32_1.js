function (sprite) {
        this.setPercentage(0);
        this._vertexData = null;
        this._vertexDataCount = 0;
        this.setAnchorPoint(new cc.Point(0.5, 0.5));

        this._type = cc.CCPROGRESS_TIMER_TYPE_RADIAL;
        this._reverseDirection = false;
        this.setMidpoint(new cc.Point(0.5, 0.5));
        this.setBarChangeRate(new cc.Point(1, 1));
        this.setSprite(sprite);

        //shader program
        //this.setShaderProgram(cc.ShaderCache.sharedShaderCache().programForKey(kCCShader_PositionTextureColor));

        return true;
    }
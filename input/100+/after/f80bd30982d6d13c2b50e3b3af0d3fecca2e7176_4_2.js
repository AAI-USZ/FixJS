function (color, width, height) {
        var winSize = cc.Director.sharedDirector().getWinSize();

        width = width || winSize.width;
        height = height || winSize.height;

        this._blendFunc.src = cc.BLEND_SRC;
        this._blendFunc.dst = cc.BLEND_DST;

        this._color = new cc.Color3B(color.r, color.g, color.b);
        this._opacity = color.a;

        for (var i = 0; i < this._squareVertices.length; i++) {
            this._squareVertices[i].x = 0.0;
            this._squareVertices[i].y = 0.0;
        }
        this._updateColor();

        this.setContentSize(new cc.Size(width, height));
        //this.setShaderProgram(cc.ShaderCache.sharedShaderCache().programForKey(kCCShader_PositionColor));

        return true;
    }
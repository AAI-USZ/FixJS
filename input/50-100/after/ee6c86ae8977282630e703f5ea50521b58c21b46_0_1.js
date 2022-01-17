function (ctx) {
        this._super();
        if (cc.renderContextType == cc.CANVAS) {

        } else {
            //TODO for WebGL
            //cc.NODE_DRAW_SETUP();

            //ccGLBlendFunc( this._blendFunc.src, this._blendFunc.dst );

            //var colors = [this._color.r / 255.0, this._color.g / 255.0, this._color.b / 255.0, this._opacity / 255.0];
            //this.getShaderProgram().setUniformLocationWith4fv(this._uniformColor, colors, 1);

            //this._textureAtlas.drawNumberOfQuads(this._quadsToDraw, 0);
        }
    }
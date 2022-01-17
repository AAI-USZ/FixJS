function (ctx) {
        //cc.PROFILER_START("cc.SpriteBatchNode - draw");
        this._super();

        if (cc.renderContextType == cc.CANVAS) {
            var context = ctx || cc.renderContext;
            //context.globalAlpha = this._opacity / 255;
            var pos = new cc.Point(0 | ( -this._anchorPointInPoints.x), 0 | ( -this._anchorPointInPoints.y));
            if (this._renderTexture) {
                //direct draw image by canvas drawImage
                context.drawImage(this._renderTexture.getCanvas(), pos.x, -(pos.y + this._renderTexture.getCanvas().height));
            }
        } else {
            // Optimization: Fast Dispatch
            if (this._textureAtlas.getTotalQuads() == 0) {
                return;
            }

            //cc.NODE_DRAW_SETUP();

            this._arrayMakeObjectsPerformSelector(this._children,cc.Node.StateCallbackType.updateTransform);

            //ccGLBlendFunc( m_blendFunc.src, m_blendFunc.dst );

            this._textureAtlas.drawQuads();

            //cc.PROFILER_STOP("CCSpriteBatchNode - draw");
        }
    }
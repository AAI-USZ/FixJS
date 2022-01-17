function (ctx) {
        this._super();

        if (cc.renderContextType == cc.CANVAS) {
            var context = ctx || cc.renderContext;
            //context.globalAlpha = this._opacity / 255;
            var pos = new cc.Point(0 | ( -this._anchorPointInPixels.x), 0 | ( -this._anchorPointInPixels.y));
            if (this._renderTexture) {
                //direct draw image by canvas drawImage
                context.drawImage(this._renderTexture.getCanvas(), pos.x, -(pos.y + this._renderTexture.getCanvas().height));
            }

            /*
             var pAp = cc.PointZero();
             if (this.getParent()) {
             pAp = this.getParent().getAnchorPointInPixels();
             }
             for (var index = 0; index < this._children.length; index++) {
             var sp = this._children[index];
             if (sp.getIsVisible()) {
             cc.saveContext();
             cc.renderContext.translate(sp.getPositionX() - pAp.x, -(sp.getPositionY() - pAp.y ));

             cc.renderContext.scale(sp.getScaleX(), sp.getScaleY());
             cc.renderContext.transform(1.0, -Math.tan(cc.DEGREES_TO_RADIANS(sp.getSkewY())), -Math.tan(cc.DEGREES_TO_RADIANS(sp.getSkewX())), 1.0, 0, 0);

             cc.renderContext.rotate(cc.DEGREES_TO_RADIANS(sp.getRotation()));
             cc.renderContext.globalAlpha = sp.getOpacity() / 255;
             if (sp._flipX) {
             cc.renderContext.scale(-1, 1);
             }
             if (sp._flipY) {
             cc.renderContext.scale(1, -1);
             }

             if ((sp.getContentSize().width == 0) && (sp.getContentSize().height == 0)) {
             cc.drawingUtil.drawImage(sp.getTexture(), cc.ccp(0 - sp.getAnchorPointInPixels().x, 0 - sp.getAnchorPointInPixels().y));
             } else {
             cc.drawingUtil.drawImage(sp.getTexture(), sp.getTextureRect().origin, sp.getTextureRect().size
             , cc.ccp(0 - sp.getAnchorPointInPixels().x, 0 - sp.getAnchorPointInPixels().y), sp.getContentSize());
             }
             cc.restoreContext();
             }
             }
             */
        } else {
            // Optimization: Fast Dispatch
            if (this._textureAtlas.getTotalQuads() == 0) {
                return;
            }

            if (this._descendants && this._descendants.length > 0) {
                var obj = null;
                for (var i = 0; i < this._descendants.length; i++) {
                    obj = this._descendants[i];
                    if (obj) {
                        obj.updateTransform();

                        // issue #528
                        var rect = obj.boundingBox();
                        var vertices = [
                            cc.ccp(rect.origin.x, rect.origin.y),
                            cc.ccp(rect.origin.x + rect.size.width, rect.origin.y),
                            cc.ccp(rect.origin.x + rect.size.width, rect.origin.y + rect.size.height),
                            cc.ccp(rect.origin.x, rect.origin.y + rect.size.height)
                        ];
                        cc.drawingUtil.drawPoly(vertices, 4, true);
                    }
                }
            }

            // Default GL states: GL_TEXTURE_2D, GL_VERTEX_ARRAY, GL_COLOR_ARRAY, GL_TEXTURE_COORD_ARRAY
            // Needed states: GL_TEXTURE_2D, GL_VERTEX_ARRAY, GL_COLOR_ARRAY, GL_TEXTURE_COORD_ARRAY
            // Unneeded states: -
            //TODO OpenGL Method
            var newBlend = this._blendFunc.src != cc.BLEND_SRC || this._blendFunc.dst != cc.BLEND_DST;
            if (newBlend) {
                //glBlendFunc(m_blendFunc.src, m_blendFunc.dst);
            }

            this._textureAtlas.drawQuads();
            if (newBlend) {
                //glBlendFunc(CC_BLEND_SRC, CC_BLEND_DST);
            }
        }
    }
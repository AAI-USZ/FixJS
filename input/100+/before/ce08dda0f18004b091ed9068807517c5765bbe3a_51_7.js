function (ctx) {
        this._super();

        var context = ctx || cc.renderContext;
        if (cc.renderContextType == cc.CANVAS) {
            context.globalAlpha = this._opacity / 255;
            if (this._flipX) {
                context.scale(-1, 1);
            }
            if (this._flipY) {
                context.scale(1, -1);
            }
            var offsetPixels = this._offsetPositionInPixels;
            var pos = new cc.Point(0 | ( -this._anchorPointInPixels.x + offsetPixels.x), 0 | ( -this._anchorPointInPixels.y + offsetPixels.y));
            if (this._texture) {
                //direct draw image by canvas drawImage
                if (this._texture instanceof HTMLImageElement) {
                    if ((this._contentSize.width == 0) && (this._contentSize.height == 0)) {
                        this.setContentSize(new cc.Size(this._texture.width, this._texture.height));
                        this._rect.size.width = this._texture.width;
                        this._rect.size.height = this._texture.height;
                        context.drawImage(this._texture, pos.x, -(pos.y + this._texture.height));
                    } else {
                        context.drawImage(this._texture,
                            this._rect.origin.x, this._rect.origin.y,
                            this._rect.size.width, this._rect.size.height,
                            pos.x, -(pos.y + this._rect.size.height),
                            this._rect.size.width, this._rect.size.height);
                    }
                } else {
                    if ((this._contentSize.width == 0) && (this._contentSize.height == 0)) {
                        this.setContentSize(new cc.Size(this._texture.width, this._texture.height));
                        this._rect.size.width = this._texture.width;
                        this._rect.size.height = this._texture.height;
                        context.drawImage(this._texture, pos.x, -(pos.y + this._texture.height));
                    } else {
                        context.drawImage(this._texture,
                            0, 0,
                            this._rect.size.width, this._rect.size.height,
                            pos.x, -(pos.y + this._rect.size.height),
                            this._rect.size.width, this._rect.size.height);
                    }
                }
            } else {
                context.fillStyle = "rgba(" + this._color.r + "," + this._color.g + "," + this._color.b + ",1)";
                context.fillRect(pos.x, pos.y, this._contentSize.width, this._contentSize.height);
            }

            //TODO need to fixed
            if (cc.SPRITE_DEBUG_DRAW == 1) {
                // draw bounding box
                var s = this._contentSize;
                var vertices = [cc.ccp(0, 0), cc.ccp(s.width, 0), cc.ccp(s.width, s.height), cc.ccp(0, s.height)];
                cc.drawingUtil.drawPoly(vertices, 4, true);
            } else if (cc.SPRITE_DEBUG_DRAW == 2) {
                // draw texture box
                var s = this._rect.size;
                var offsetPix = this.getOffsetPositionInPixels();
                var vertices = [cc.ccp(offsetPix.x, offsetPix.y), cc.ccp(offsetPix.x + s.width, offsetPix.y),
                    cc.ccp(offsetPix.x + s.width, offsetPix.y + s.height), cc.ccp(offsetPix.x, offsetPix.y + s.height)];
                cc.drawingUtil.drawPoly(vertices, 4, true);
            }
        } else {
            cc.Assert(!this._usesBatchNode, "");

            // Default GL states: GL_TEXTURE_2D, GL_VERTEX_ARRAY, GL_COLOR_ARRAY, GL_TEXTURE_COORD_ARRAY
            // Needed states: GL_TEXTURE_2D, GL_VERTEX_ARRAY, GL_COLOR_ARRAY, GL_TEXTURE_COORD_ARRAY
            // Unneeded states: -
            var newBlend = this._blendFunc.src != cc.BLEND_SRC || this._blendFunc.dst != cc.BLEND_DST;
            if (newBlend) {
                //TODO
                //glBlendFunc(this._blendFunc.src, this._blendFunc.dst);
            }

            //#define kQuadSize  sizeof(this._quad.bl)
            if (this._texture) {
                //TODO
                //glBindTexture(GL_TEXTURE_2D, this._texture.getName());
            }
            else {
                //TODO
                //glBindTexture(GL_TEXTURE_2D, 0);
            }

            var offset = this._quad;

            // vertex
            var diff = cc.offsetof(cc.V3F_C4B_T2F, cc.vertices);
            //TODO
            // glVertexPointer(3, GL_FLOAT, kQuadSize, (offset + diff));

            // color
            diff = cc.offsetof(cc.V3F_C4B_T2F, cc.colors);
            //TODO
            // glColorPointer(4, GL_UNSIGNED_BYTE, kQuadSize, (offset + diff));

            // tex coords
            diff = cc.offsetof(cc.V3F_C4B_T2F, cc.texCoords);
            //TODO
            //glTexCoordPointer(2, GL_FLOAT, kQuadSize, (offset + diff));

            //glDrawArrays(GL_TRIANGLE_STRIP, 0, 4);

            if (newBlend) {
                //glBlendFunc(cc.BLEND_SRC, cc.BLEND_DST);
            }

            if (cc.SPRITE_DEBUG_DRAW == 1) {
                // draw bounding box
                var s = this._contentSize;
                var vertices = [cc.ccp(0, 0), cc.ccp(s.width, 0), cc.ccp(s.width, s.height), cc.ccp(0, s.height)];
                cc.drawingUtil.drawPoly(vertices, 4, true);
            }
            else if (cc.SPRITE_DEBUG_DRAW == 2) {
                // draw texture box
                var s = this._rect.size;
                var offsetPix = new cc.Point();
                offsetPix = this.getOffsetPositionInPixels();
                var vertices = [cc.ccp(offsetPix.x, offsetPix.y), cc.ccp(offsetPix.x + s.width, offsetPix.y),
                    cc.ccp(offsetPix.x + s.width, offsetPix.y + s.height), cc.ccp(offsetPix.x, offsetPix.y + s.height)];
                cc.drawingUtil.drawPoly(vertices, 4, true);
            } // CC_SPRITE_DEBUG_DRAW
        }
    }
function (ctx) {
        this._super();

        //cc.PROFILER_START_CATEGORY(kCCProfilerCategorySprite, "cc.Sprite - draw");
        var s, vertices, offsetPix;

        var context = ctx || cc.renderContext;
        if (cc.renderContextType == cc.CANVAS) {

            if(this._blendFunc && (this._blendFunc.src == cc.GL_SRC_ALPHA) && (this._blendFunc.dst == cc.GL_ONE)){
                context.globalCompositeOperation = 'lighter';
            }

            context.globalAlpha = this._opacity / 255;
            var centerPoint, mpX=0, mpY=0;
            if (this._flipX) {
                centerPoint = new cc.Point(this._contentSize.width / 2, this._contentSize.height / 2);
                mpX = 0 | (centerPoint.x - this._anchorPointInPoints.x);
                context.translate(mpX, 0);
                context.scale(-1, 1);
            }

            if (this._flipY) {
                centerPoint = new cc.Point(this._contentSize.width / 2, this._contentSize.height / 2);
                mpY = -(0 | (centerPoint.y - this._anchorPointInPoints.y));
                context.translate(0, mpY);
                context.scale(1, -1);
            }

            var offsetPixels = this._offsetPosition;
            var pos = new cc.Point(0 | ( -this._anchorPointInPoints.x - mpX + offsetPixels.x),
                0 | ( -this._anchorPointInPoints.y + mpY + offsetPixels.y));

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
                s = this._contentSize;
                context.strokeStyle = "rgba(0,255,0,1)";
                vertices = [cc.ccp(pos.x, pos.y), cc.ccp(pos.x + s.width, pos.y), cc.ccp(pos.x + s.width, pos.y + s.height), cc.ccp(pos.x, pos.y + s.height)];
                cc.drawingUtil.drawPoly(vertices, 4, true);
            } else if (cc.SPRITE_DEBUG_DRAW == 2) {
                // draw texture box
                context.strokeStyle = "rgba(0,255,0,1)";
                s = this.getTextureRect().size;
                offsetPix = this.getOffsetPosition();
                vertices = [cc.ccp(offsetPix.x, offsetPix.y), cc.ccp(offsetPix.x + s.width, offsetPix.y),
                    cc.ccp(offsetPix.x + s.width, offsetPix.y + s.height), cc.ccp(offsetPix.x, offsetPix.y + s.height)];
                cc.drawingUtil.drawPoly(vertices, 4, true);
            }
        } else {
            //TODO  WebGL Draw of sprite
            cc.Assert(!this._batchNode, "If cc.Sprite is being rendered by cc.SpriteBatchNode, cc.Sprite#draw SHOULD NOT be called");

            cc.NODE_DRAW_SETUP(this);

            //ccGLBlendFunc( m_sBlendFunc.src, m_sBlendFunc.dst );

            if (this._texture) {
                //ccGLBindTexture2D(this._texture.getName());
            } else {
                //ccGLBindTexture2D(0);
            }

            //
            // Attributes
            //
            //ccGLEnableVertexAttribs( kCCVertexAttribFlag_PosColorTex );

            //#define kQuadSize  sizeof(this._quad.bl)
            var offset = this._quad;

            // vertex
            //int diff = offsetof( ccV3F_C4B_T2F, vertices);
            //glVertexAttribPointer(kCCVertexAttrib_Position, 3, GL_FLOAT, GL_FALSE, kQuadSize, (void*) (offset + diff));

            // texCoods
            //diff = offsetof( ccV3F_C4B_T2F, texCoords);
            //glVertexAttribPointer(kCCVertexAttrib_TexCoords, 2, GL_FLOAT, GL_FALSE, kQuadSize, (void*)(offset + diff));

            // color
            //diff = offsetof( ccV3F_C4B_T2F, colors);
            //glVertexAttribPointer(kCCVertexAttrib_Color, 4, GL_UNSIGNED_BYTE, GL_TRUE, kQuadSize, (void*)(offset + diff));

            //glDrawArrays(GL_TRIANGLE_STRIP, 0, 4);

            //CHECK_GL_ERROR_DEBUG();

            if (cc.SPRITE_DEBUG_DRAW == 1) {
                // draw bounding box
                vertices = [
                    new cc.Point(this._quad.tl.vertices.x, this._quad.tl.vertices.y),
                    new cc.Point(this._quad.bl.vertices.x, this._quad.bl.vertices.y),
                    new cc.Point(this._quad.br.vertices.x, this._quad.br.vertices.y),
                    new cc.Point(this._quad.tr.vertices.x, this._quad.tr.vertices.y)
                ];
                cc.drawingUtil.drawPoly(vertices, 4, true);
            }
            else if (cc.SPRITE_DEBUG_DRAW == 2) {
                // draw texture box
                s = this.getTextureRect().size;
                offsetPix = this.getOffsetPosition();
                vertices = [cc.ccp(offsetPix.x, offsetPix.y), cc.ccp(offsetPix.x + s.width, offsetPix.y),
                    cc.ccp(offsetPix.x + s.width, offsetPix.y + s.height), cc.ccp(offsetPix.x, offsetPix.y + s.height)];
                cc.drawingUtil.drawPoly(vertices, 4, true);
            } // CC_SPRITE_DEBUG_DRAW
        }

        cc.INCREMENT_GL_DRAWS(1);

        //CC_PROFILER_STOP_CATEGORY(kCCProfilerCategorySprite, "CCSprite - draw");
    }
function (ctx) {
        cc.Assert(!this._batchNode, "draw should not be called when added to a particleBatchNode");
        this._super();
        if (cc.renderContextType == cc.CANVAS) {
            var context = ctx || cc.renderContext;
            context.save();
            if (this._isBlendAdditive) {
                context.globalCompositeOperation = 'lighter';
            } else {
                context.globalCompositeOperation = 'source-over';
            }

            for (var i = 0; i < this._particleCount; i++) {
                var particle = this._particles[i];
                var lpx = (0 | (particle.size * 0.5));

                //TODO these are temporary code, need modifier
                if (this._drawMode == cc.PARTICLE_TEXTURE_MODE) {
                    var drawTexture = this.getTexture();
                    if (particle.isChangeColor) {
                        var cacheTextureForColor = cc.TextureCache.sharedTextureCache().getTextureColors(this.getTexture());
                        if (cacheTextureForColor) {
                            drawTexture = cc.generateTintImage(this.getTexture(), cacheTextureForColor, particle.color);
                        }
                    }

                    context.save();
                    context.globalAlpha = particle.color.a;
                    context.translate(0 | particle.drawPos.x, -(0 | particle.drawPos.y));
                    context.drawImage(drawTexture,
                        lpx, -(lpx + particle.size),
                        particle.size, particle.size);
                    context.restore();
                } else {
                    context.save();
                    context.globalAlpha = particle.color.a;
                    context.translate(0 | particle.drawPos.x, -(0 | particle.drawPos.y));
                    if (this._shapeType == cc.PARTICLE_STAR_SHAPE) {
                        cc.drawingUtil.drawStar(context, new cc.Point(0, 0), lpx, particle.color);
                    } else {
                        cc.drawingUtil.drawColorBall(context, new cc.Point(0, 0), lpx, particle.color);
                    }
                    context.restore()
                }
            }
            context.restore();
        } else {
            cc.NODE_DRAW_SETUP();

            ccGLBindTexture2D(this._texture.getName());
            ccGLBlendFunc(m_tBlendFunc.src, m_tBlendFunc.dst);

            cc.Assert(this._particleIdx == this._particleCount, "Abnormal error in particle quad");

            if (cc.TEXTURE_ATLAS_USE_VAO) {
                //
                // Using VBO and VAO
                //
                glBindVertexArray(this._VAOname);

                if (cc.REBIND_INDICES_BUFFER)
                    glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, this._buffersVBO[1]);

                glDrawElements(GL_TRIANGLES, this._particleIdx * 6, GL_UNSIGNED_SHORT, 0);

                if (cc.REBIND_INDICES_BUFFER)
                    glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, 0);

                glBindVertexArray(0);
            } else {
                //
                // Using VBO without VAO
                //
                var kQuadSize = sizeof(m_pQuads[0].bl);

                ccGLEnableVertexAttribs(kCCVertexAttribFlag_PosColorTex);

                glBindBuffer(GL_ARRAY_BUFFER, this._buffersVBO[0]);
                // vertices
                glVertexAttribPointer(kCCVertexAttrib_Position, 3, GL_FLOAT, GL_FALSE, kQuadSize, offsetof(ccV3F_C4B_T2F, vertices));
                // colors
                glVertexAttribPointer(kCCVertexAttrib_Color, 4, GL_UNSIGNED_BYTE, GL_TRUE, kQuadSize, offsetof(ccV3F_C4B_T2F, colors));
                // tex coords
                glVertexAttribPointer(kCCVertexAttrib_TexCoords, 2, GL_FLOAT, GL_FALSE, kQuadSize, offsetof(ccV3F_C4B_T2F, texCoords));

                glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, this._buffersVBO[1]);

                glDrawElements(GL_TRIANGLES, this._particleIdx * 6, GL_UNSIGNED_SHORT, 0);

                glBindBuffer(GL_ARRAY_BUFFER, 0);
                glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, 0);
            }
            CHECK_GL_ERROR_DEBUG();
        }

        cc.INCREMENT_GL_DRAWS(1);
    }
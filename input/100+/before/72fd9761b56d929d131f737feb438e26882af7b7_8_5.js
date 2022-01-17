function (ctx) {
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
            //TODO need fixed for webGL
            // Default GL states: GL_TEXTURE_2D, GL_VERTEX_ARRAY, GL_COLOR_ARRAY, GL_TEXTURE_COORD_ARRAY
            // Needed states: GL_TEXTURE_2D, GL_VERTEX_ARRAY, GL_COLOR_ARRAY, GL_TEXTURE_COORD_ARRAY
            // Unneeded states: -
            glBindTexture(GL_TEXTURE_2D, this._texture.getName());

            var quadSize = sizeof(this._quads[0].bl);

            if (cc.USES_VBO) {
                glBindBuffer(GL_ARRAY_BUFFER, this._quadsID);

                if (cc.ENABLE_CACHE_TEXTTURE_DATA) {
                    glBufferData(GL_ARRAY_BUFFER, sizeof(this._quads[0]) * this._totalParticles, this._quads, GL_DYNAMIC_DRAW);
                }

                glVertexPointer(2, GL_FLOAT, quadSize, 0);

                glColorPointer(4, GL_UNSIGNED_BYTE, quadSize, offsetof(ccV2F_C4B_T2F, colors));

                glTexCoordPointer(2, GL_FLOAT, quadSize, offsetof(ccV2F_C4B_T2F, texCoords));
            } else {
                var offset = this._quads;

                // vertex
                var diff = offsetof(cc.V2F_C4B_T2F, vertices);
                glVertexPointer(2, GL_FLOAT, quadSize, (offset + diff));

                // color
                diff = offsetof(cc.V2F_C4B_T2F, colors);
                glColorPointer(4, GL_UNSIGNED_BYTE, quadSize, (offset + diff));

                // tex coords
                diff = offsetof(cc.V2F_C4B_T2F, texCoords);
                glTexCoordPointer(2, GL_FLOAT, quadSize, (offset + diff));
            }


            var newBlend = !!(this._blendFunc.src != cc.BLEND_SRC || this._blendFunc.dst != cc.BLEND_DST);
            if (newBlend) {
                glBlendFunc(this._blendFunc.src, this._blendFunc.dst);
            }

            cc.Assert(this._particleIdx == this._particleCount, "Abnormal error in particle quad");

            glDrawElements(GL_TRIANGLES, (this._particleIdx * 6), GL_UNSIGNED_SHORT, this._indices);

            // restore blend state
            if (newBlend)
                glBlendFunc(cc.BLEND_SRC, cc.BLEND_DST);

            if (cc.USES_VBO)
                glBindBuffer(GL_ARRAY_BUFFER, 0);
        }
    }
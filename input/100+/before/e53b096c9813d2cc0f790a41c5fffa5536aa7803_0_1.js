function (ctx) {
        this._super();
        if (cc.renderContextType == cc.CANVAS) {
            var context = ctx || cc.renderContext;
            context.globalAlpha = this.getOpacity() / 255;
            var tempAtlas = this._textureAtlas;
            var tempTexture = this.getTexture();
            var tempQuads = this._textureAtlas._quads;
            var sx, sy, w, h, dx, dy;
            var pos = new cc.Point(0 | ( -this._anchorPointInPixels.x), 0 | ( -this._anchorPointInPixels.y));
            for (var i = 0, len = this._textureAtlas.getCapacity(); i < len; i++) {
                sx = parseFloat(tempQuads[i].tl.texCoords.u) * tempTexture.width;
                sy = parseFloat(tempQuads[i].tl.texCoords.v) * tempTexture.height;
                dx = tempQuads[i].tl.vertices.x;
                dy = tempQuads[i].tl.vertices.y;
                /*dx = 0;
                 dy = 0;*/
                w = (parseFloat(tempQuads[i].br.texCoords.u) - parseFloat(tempQuads[i].tl.texCoords.u)) * tempTexture.width;
                h = (parseFloat(tempQuads[i].br.texCoords.v) - parseFloat(tempQuads[i].tl.texCoords.v)) * tempTexture.height;
                //console.log(sx,sy,w,h,dx,dy,w,h);
                if (i == 8) {
                    //throw "";
                }
                context.drawImage(tempTexture, sx, sy, w, h, dx + pos.x, -(dy + pos.y), w, h);
            }
        }
        else {
            // Default GL states: GL_TEXTURE_2D, GL_VERTEX_ARRAY, GL_COLOR_ARRAY, GL_TEXTURE_COORD_ARRAY
            // Needed states: GL_TEXTURE_2D, GL_VERTEX_ARRAY, GL_TEXTURE_COORD_ARRAY
            // Unneeded states: GL_COLOR_ARRAY
            //TODO, for webgl porting.
            //glDisableClientState(GL_COLOR_ARRAY);

            // glColor4ub isn't implement on some android devices
            // glColor4ub( color.r, color.g, color.b, opacity);
            //glColor4f(((GLfloat)color.r) / 255, ((GLfloat)color.g) / 255, ((GLfloat)color.b) / 255, ((GLfloat)opacity) / 255);
            var newBlend = this._blendFunc.src != cc.BLEND_SRC || this._blendFunc.dst != cc.BLEND_DST;
            if (newBlend) {
                // TODO, need to be fixed
                //glBlendFunc( blendFunc.src, blendFunc.dst );
            }

            this._textureAtlas.drawNumberOfQuads(this._quadsToDraw, 0);

            if (newBlend) {
                //glBlendFunc(cc.BLEND_SRC, cc.BLEND_DST);
            }

            // is this chepear than saving/restoring color state ?
            // XXX: There is no need to restore the color to (255,255,255,255). Objects should use the color
            // XXX: that they need
            //	glColor4ub( 255, 255, 255, 255);

            // restore default GL state
            //TODO, need to be fixed.
            //glEnableClientState(GL_COLOR_ARRAY);
        }
    }
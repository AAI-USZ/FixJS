function (ctx) {
        this._super();
        if (cc.renderContextType == cc.CANVAS) {

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
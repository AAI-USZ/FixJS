function (isTOCacheTexture) {
        ccglBindFramebuffer(cc.GL_FRAMEBUFFER, this._oldFBO);
        // Restore the original matrix and viewport
        glPopMatrix();
        var size = cc.Director.sharedDirector().getWinSizeInPixels();
        //	glViewport(0, 0, (GLsizei)size.width, (GLsizei)size.height);
        cc.Director.sharedDirector().getOpenGLView().setViewPortInPoints(0, 0, size.width, size.height);

        if (cc.ENABLE_CACHE_TEXTTURE_DATA) {
            if (isTOCacheTexture) {
                // to get the rendered texture data
                var s = this._texture.getContentSizeInPixels();
                var tx = s.width;
                var ty = s.height;
                this._uITextureImage = new cc.Image();
                if (true == this.getUIImageFromBuffer(this._uITextureImage, 0, 0, tx, ty)) {
                    cc.VolatileTexture.addDataTexture(this._texture, this._uITextureImage.getData(), cc.TEXTURE_2D_PIXEL_FORMAT_RGBA8888, s);
                } else {
                    cc.Log("Cache rendertexture failed!");
                }
            }
        }
    }
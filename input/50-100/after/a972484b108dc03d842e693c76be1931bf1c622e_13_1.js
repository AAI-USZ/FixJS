function (obj) {
        if (cc.ENABLE_CACHE_TEXTURE_DATA) {
            cc.SAFE_DELETE(this.pITextureImage);

            // to get the rendered texture data
            this.pITextureImage = this.newCCImage();

            if (this.pITextureImage) {
                var s = this._texture.getContentSizeInPixels();
                VolatileTexture.addDataTexture(this._texture, this.pITextureImage.getData(), cc.TEXTURE_2D_PIXEL_FORMAT_RGBA8888, s);
            } else {
                cc.log("Cache rendertexture failed!");
            }
        }
    }
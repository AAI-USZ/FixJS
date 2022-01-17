function (data, level, bpp, hasAlpha, length, pixelFormat) {
                if (!(cc.Configuration.getInstance().isSupportsPVRTC())) {
                    cc.Log("cocos2d: WARNING: PVRTC images is not supported.");
                    return false;
                }

                //TODO
                // glGenTextures(1, this._name);
                //TODO
                // glBindTexture(cc.GL_TEXTURE_2D, this._name);

                this.setAntiAliasTexParameters();

                var format;
                var size = new cc.GLsizei();
                size = length * length * bpp / 8;
                if (hasAlpha) {
                    format = (bpp == 4) ? cc.GL_COMPRESSED_RGBA_PVRTC_4BPPV1_IMG : cc.GL_COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
                } else {
                    format = (bpp == 4) ? cc.GL_COMPRESSED_RGB_PVRTC_4BPPV1_IMG : cc.GL_COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
                }
                if (size < 32) {
                    size = 32;
                }
                //TODO
                // glCompressedTexImage2D(cc.GL_TEXTURE_2D, level, format, length, length, 0, size, data);

                this._contentSize = cc.SizeMake(length, length);
                this._pixelsWide = length;
                this._pixelsHigh = length;
                this._maxS = 1.0;
                this._maxT = 1.0;
                this._hasPremultipliedAlpha = cc.PVRHaveAlphaPremultiplied_;
                this._pixelFormat = pixelFormat;

                return true;
            }
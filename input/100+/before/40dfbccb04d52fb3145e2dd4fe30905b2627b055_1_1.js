function (width, height, format) {
        if (cc.renderContextType == cc.CANVAS) {
            this.canvas.width = width || 10;
            this.canvas.height = height || 10;

            this.context.translate(0, this.canvas.height);
            return true;
        }
        //TODO
        // If the gles version is lower than GLES_VER_1_0,
        // some extended gles functions can't be implemented, so return false directly.
        if (cc.Configuration.sharedConfiguration().getGlesVersion() <= GLES_VER_1_0) {
            return false;
        }

        var ret = false;
        do
        {
            width *= cc.CONTENT_SCALE_FACTOR();
            height *= cc.CONTENT_SCALE_FACTOR();

            glGetIntegerv(cc.GL_FRAMEBUFFER_BINDING, this._oldFBO);

            // textures must be power of two squared
            var powW = cc.NextPOT(width);
            var powH = cc.NextPOT(height);

            //void *data = malloc(powW * powH * 4);
            var data = [];
            cc.BREAK_IF(!data);

            //memset(data, 0, (int)(powW * powH * 4));
            for (var i = 0; i < powW * powH * 4; i++) {
                data[i] = 0;
            }

            this._pixelFormat = format;

            this._texture = new cc.Texture2D();
            cc.BREAK_IF(!this._texture);

            this._texture.initWithData(data, this._pixelFormat, powW, powH, cc.SizeMake(width, height));
            //free( data );

            // generate FBO
            ccglGenFramebuffers(1, this._fBO);
            ccglBindFramebuffer(cc.GL_FRAMEBUFFER, this._fBO);

            // associate texture with FBO
            ccglFramebufferTexture2D(cc.GL_FRAMEBUFFER, cc.GL_COLOR_ATTACHMENT0, GL_TEXTURE_2D, texture.getName(), 0);

            // check if it worked (probably worth doing :) )
            var status = ccglCheckFramebufferStatus(cc.GL_FRAMEBUFFER);
            if (status != cc.GL_FRAMEBUFFER_COMPLETE) {
                cc.Assert(0, "Render Texture : Could not attach texture to framebuffer");
                break;
            }

            this._texture.setAliasTexParameters();

            this._sprite = cc.Sprite.spriteWithTexture(this._texture);

            this._sprite.setScaleY(-1);
            this.addChild(this._sprite);

            var tBlendFunc = new cc.BlendFunc(GL_ONE, GL_ONE_MINUS_SRC_ALPHA);
            this._sprite.setBlendFunc(tBlendFunc);

            ccglBindFramebuffer(cc.GL_FRAMEBUFFER, this._oldFBO);
            ret = true;
        } while (0);
        return ret;
    }
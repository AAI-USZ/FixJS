function (width, height, format, depthStencilFormat) {
        if (cc.renderContextType == cc.CANVAS) {
            this.canvas.width = width || 10;
            this.canvas.height = height || 10;

            this.context.translate(0, this.canvas.height);
            return true;
        } else {
            //TODO
            cc.Assert(this._pixelFormat != cc.CCTEXTURE_2D_PIXEL_FORMAT_A8, "only RGB and RGBA formats are valid for a render texture");

            try {
                width *= cc.CONTENT_SCALE_FACTOR();
                height *= cc.CONTENT_SCALE_FACTOR();

                glGetIntegerv(cc.GL_FRAMEBUFFER_BINDING, this._oldFBO);

                // textures must be power of two squared
                var powW = 0;
                var powH = 0;

                if( cc.Configuration.sharedConfiguration().supportsNPOT() ) {
                    powW = width;
                    powH = height;
                } else {
                    powW = cc.NextPOT(width);
                    powH = cc.NextPOT(height);
                }

                //void *data = malloc(powW * powH * 4);
                var data = [];
                //memset(data, 0, (int)(powW * powH * 4));
                for (var i = 0; i < powW * powH * 4; i++) {
                    data[i] = 0;
                }

                this._pixelFormat = format;

                this._texture = new cc.Texture2D();
                if(!this._texture)
                    return false;

                this._texture.initWithData(data, this._pixelFormat, powW, powH, cc.SizeMake(width, height));
                //free( data );

                var oldRBO;
                glGetIntegerv(GL_RENDERBUFFER_BINDING, oldRBO);

                // generate FBO
                glGenFramebuffers(1, this._fBO);
                glBindFramebuffer(GL_FRAMEBUFFER, this._fBO);

                // associate texture with FBO
                glFramebufferTexture2D(cc.GL_FRAMEBUFFER, cc.GL_COLOR_ATTACHMENT0, GL_TEXTURE_2D, this._texture.getName(), 0);

                if (this._depthRenderBuffer != 0) {
                    //create and attach depth buffer
                    glGenRenderbuffers(1, this._depthRenderBuffer);
                    glBindRenderbuffer(GL_RENDERBUFFER, this._depthRenderBuffer);
                    glRenderbufferStorage(GL_RENDERBUFFER, depthStencilFormat, powW, powH);
                    glFramebufferRenderbuffer(GL_FRAMEBUFFER, GL_DEPTH_ATTACHMENT, GL_RENDERBUFFER, this._depthRenderBuffer);

                    // if depth format is the one with stencil part, bind same render buffer as stencil attachment
                    if (depthStencilFormat == cc.GL_DEPTH24_STENCIL8)
                        glFramebufferRenderbuffer(GL_FRAMEBUFFER, GL_STENCIL_ATTACHMENT, GL_RENDERBUFFER, this._depthRenderBuffer);
                }


                // check if it worked (probably worth doing :) )
                cc.Assert(glCheckFramebufferStatus(GL_FRAMEBUFFER) == GL_FRAMEBUFFER_COMPLETE, "Could not attach texture to framebuffer");

                this._texture.setAliasTexParameters();

                this._sprite = cc.Sprite.createWithTexture(this._texture);

                this._sprite.setScaleY(-1);
                this.addChild(this._sprite);

                var tBlendFunc = new cc.BlendFunc(GL_ONE, GL_ONE_MINUS_SRC_ALPHA);
                this._sprite.setBlendFunc(tBlendFunc);

                glBindRenderbuffer(GL_RENDERBUFFER, oldRBO);
                glBindFramebuffer(GL_FRAMEBUFFER, this._oldFBO);
            } catch(ex){
               return false;
            }
            return true;
        }
    }
function (numberOfParticles) {
        // base initialization
        if (this._super(numberOfParticles)) {
            // allocating data space
            if (!this._allocMemory()) {
                return false;
            }
            this.setupIndices();
            if (cc.TEXTURE_ATLAS_USE_VAO) {
                this._setupVBOandVAO();
            } else {
                this._setupVBO();
            }

            //this.setShaderProgram(cc.ShaderCache.sharedShaderCache().programForKey(kCCShader_PositionTextureColor));

            // Need to listen the event only when not use batchnode, because it will use VBO
            //extension.CCNotificationCenter.sharedNotificationCenter().addObserver(this,
            //    callfuncO_selector(cc.ParticleSystemQuad.listenBackToForeground),
            //    EVNET_COME_TO_FOREGROUND,
            //    null);

            return true;
        }
        return false;
    }
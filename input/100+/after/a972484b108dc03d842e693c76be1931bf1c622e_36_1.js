function () {
        var particleSystem = null;

        /*
         * Tests:
         * 1 Quad Particle System using 32-bit textures (PNG)
         * 2: Quad Particle System using 16-bit textures (PNG)
         * 3: Quad Particle System using 8-bit textures (PNG)
         * 4: Quad Particle System using 4-bit textures (PVRTC)
         */

        this.removeChildByTag(TAG_PARTICLE_SYSTEM, true);

        //todo
        // remove the "fire.png" from the TextureCache cache.
        var texture = cc.TextureCache.getInstance().addImage("res/Images/fire.png");
        cc.TextureCache.getInstance().removeTexture(texture);

        particleSystem = new cc.ParticleSystemQuad();

        switch (this._subtestNumber) {
            case 1:
                cc.Texture2D.setDefaultAlphaPixelFormat(cc.TEXTURE_2D_PIXEL_FORMAT_RGBA8888);
                particleSystem.initWithTotalParticles(this._quantityParticles);
                particleSystem.setTexture(cc.TextureCache.getInstance().addImage("res/Images/fire.png"));
                break;
            case 2:
                cc.Texture2D.setDefaultAlphaPixelFormat(cc.TEXTURE_2D_PIXEL_FORMAT_RGBA4444);
                particleSystem.initWithTotalParticles(this._quantityParticles);
                particleSystem.setTexture(cc.TextureCache.getInstance().addImage("res/Images/fire.png"));
                break;
            case 3:
                cc.Texture2D.setDefaultAlphaPixelFormat(cc.TEXTURE_2D_PIXEL_FORMAT_A8);
                particleSystem.initWithTotalParticles(this._quantityParticles);
                particleSystem.setTexture(cc.TextureCache.getInstance().addImage("res/Images/fire.png"));
                break;
            default:
                particleSystem = null;
                cc.log("Shall not happen!");
                break;
        }
        this.addChild(particleSystem, 0, TAG_PARTICLE_SYSTEM);

        this.doTest();

        // restore the default pixel format
        cc.Texture2D.setDefaultAlphaPixelFormat(cc.TEXTURE_2D_PIXEL_FORMAT_RGBA8888);
    }
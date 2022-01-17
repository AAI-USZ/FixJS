function () {
        this._super();

        this._emitter = cc.ParticleExplosion.create();
        this._background.addChild(this._emitter, 10);

        this._emitter.setTexture(cc.TextureCache.sharedTextureCache().addImage(s_stars1));
        this._emitter.setShapeType(cc.PARTICLE_STAR_SHAPE);
        this._emitter.setIsAutoRemoveOnFinish(true);

        this.setEmitterPosition();
    }
function (totalParticles) {
        cc.Assert( totalParticles <= this._allocatedParticles, "Particle: resizing particle array only supported for quads");
        this._totalParticles = totalParticles;
    }
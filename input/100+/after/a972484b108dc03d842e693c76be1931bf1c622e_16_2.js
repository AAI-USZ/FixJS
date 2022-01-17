function () {
        //cc.Assert(( !this._quads && !this._indices), "Memory already alloced");
        cc.Assert(!this._batchNode, "Memory should not be alloced when not using batchNode");
        this._quads = [];
        this._indices = [];
        for (var i = 0; i < this._totalParticles; i++) {
            this._quads[i] = new cc.V3F_C4B_T2F_Quad();
            this._indices[i * 6] = 0;
            this._indices[(i * 6) + 1] = 0;
            this._indices[(i * 6) + 2] = 0;
            this._indices[(i * 6) + 3] = 0;
            this._indices[(i * 6) + 4] = 0;
            this._indices[(i * 6) + 5] = 0;
        }

        if (!this._quads || !this._indices) {
            cc.log("cocos2d: Particle system: not enough memory");
            return false;
        }

        return true;
    }
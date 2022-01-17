function (numberOfParticles) {
        // base initialization
        if (this._super(numberOfParticles)) {
            // allocating data space
            this._quads = [];
            for (var i = 0; i < this._totalParticles; i++) {
                this._quads[i] = cc.V3F_C4B_T2F_QuadZero();
            }
            this._indices = [];
            for (i = 0; i < this._totalParticles * 6; i++) {
                this._indices[i] = 0;
            }

            if (!this._quads || !this._indices) {
                cc.Log("cocos2d: Particle system: not enough memory");
                if (this._quads)
                    this._quads = null;
                if (this._indices)
                    this._indices = null;

                return null;
            }

            // initialize only once the texCoords and the indices
            if (this._texture) {
                this.initTexCoordsWithRect(cc.RectMake(0, 0, this._texture.getPixelsWide(), this._texture.getPixelsHigh()));
            } else {
                this.initTexCoordsWithRect(cc.RectMake(0, 0, 1, 1));
            }

            this.initIndices();

            if (cc.USES_VBO) {
                //TODO
                //glEnable(GL_VERTEX_ARRAY);

                // create the VBO buffer
                //glGenBuffers(1, quadsID);


                // initial binding
                //glBindBuffer(GL_ARRAY_BUFFER, quadsID);
                //glBufferData(GL_ARRAY_BUFFER, sizeof(quads[0])*totalParticles, quads, GL_DYNAMIC_DRAW);
                //glBindBuffer(GL_ARRAY_BUFFER, 0);
            }

            return true;
        }
        return false;
    }
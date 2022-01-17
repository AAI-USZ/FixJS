function (tp) {
        this._totalParticles = tp;
        return;

        // If we are setting the total numer of particles to a number higher
        // than what is allocated, we need to allocate new arrays
        if (tp > m_uAllocatedParticles) {
            // Allocate new memory
            var particlesSize = tp * sizeof(tCCParticle);
            var quadsSize = sizeof(this._quads[0]) * tp * 1;
            var indicesSize = sizeof(m_pIndices[0]) * tp * 6 * 1;

            //var particlesNew = (tCCParticle*)realloc(m_pParticles, particlesSize);
            //ccV3F_C4B_T2F_Quad* quadsNew = (ccV3F_C4B_T2F_Quad*)realloc(m_pQuads, quadsSize);
            //GLushort* indicesNew = (GLushort*)realloc(m_pIndices, indicesSize);

            if (particlesNew && quadsNew && indicesNew) {
                // Assign pointers
                m_pParticles = particlesNew;
                m_pQuads = quadsNew;
                m_pIndices = indicesNew;

                // Clear the memory
                memset(m_pParticles, 0, particlesSize);
                memset(m_pQuads, 0, quadsSize);
                memset(m_pIndices, 0, indicesSize);

                m_uAllocatedParticles = tp;
            } else {
                // Out of memory, failed to resize some array
                if (particlesNew) m_pParticles = particlesNew;
                if (quadsNew) m_pQuads = quadsNew;
                if (indicesNew) m_pIndices = indicesNew;

                cc.log("Particle system: out of memory");
                return;
            }

            m_uTotalParticles = tp;

            // Init particles
            if (this._batchNode) {
                for (var i = 0; i < m_uTotalParticles; i++) {
                    this._particles[i].atlasIndex = i;
                }
            }

            this.setupIndices();
            if (cc.TEXTURE_ATLAS_USE_VAO)
                this._setupVBOandVAO();
            else
                this._setupVBO();

        }
        else {
            m_uTotalParticles = tp;
        }
    }
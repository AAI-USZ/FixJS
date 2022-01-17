function () {
        if (cc.renderContextType == cc.CANVAS) {

        } else {
            //TODO
            glBindBuffer(GL_ARRAY_BUFFER, this._buffersVBO[0]);
            glBufferSubData(GL_ARRAY_BUFFER, 0, sizeof(this._quads[0]) * particleCount, this._quads);
            glBindBuffer(GL_ARRAY_BUFFER, 0);

            CHECK_GL_ERROR_DEBUG();
        }
    }
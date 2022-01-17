function () {
        if (cc.renderContextType == cc.CANVAS) {

        } else {
            if (cc.USES_VBO) {
                //TODO
                glBindBuffer(GL_ARRAY_BUFFER, quadsID);
                glBufferSubData(GL_ARRAY_BUFFER, 0, sizeof(quads[0]) * particleCount, quads);
                glBindBuffer(GL_ARRAY_BUFFER, 0);
            }
        }
    }
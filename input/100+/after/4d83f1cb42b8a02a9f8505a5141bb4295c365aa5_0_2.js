function () {
        //TODO
        // Save the current matrix
        kmGLPushMatrix();

        var texSize = this._texture.getContentSizeInPixels();

        // Calculate the adjustment ratios based on the old and new projections
        var size = cc.Director.sharedDirector().getWinSizeInPixels();
        var widthRatio = size.width / texSize.width;
        var heightRatio = size.height / texSize.height;

        // Adjust the orthographic projection and viewport
        glViewport(0, 0, texSize.width, texSize.height);

        var orthoMatrix;
        kmMat4OrthographicProjection(orthoMatrix, -1.0 / widthRatio,  1.0 / widthRatio,
            -1.0 / heightRatio, 1.0 / heightRatio, -1,1 );
        kmGLMultMatrix(orthoMatrix);

        glGetIntegerv(cc.GL_FRAMEBUFFER_BINDING, this._oldFBO);
        glBindFramebuffer(cc.GL_FRAMEBUFFER, this._fBO);//Will direct drawing to the frame buffer created above
    }
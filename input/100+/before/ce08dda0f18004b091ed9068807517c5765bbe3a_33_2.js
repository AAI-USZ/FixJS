function () {
        //TODO
        // Save the current matrix
        glPushMatrix();

        var texSize = this._texture.getContentSizeInPixels();

        // Calculate the adjustment ratios based on the old and new projections
        var size = cc.Director.sharedDirector().getDisplaySizeInPixels();
        var widthRatio = size.width / texSize.width;
        var heightRatio = size.height / texSize.height;

        // Adjust the orthographic propjection and viewport
        ccglOrtho(-1.0 / widthRatio, 1.0 / widthRatio, -1.0 / heightRatio, 1.0 / heightRatio, -1, 1);
        glViewport(0, 0, texSize.width, texSize.height);
//     CCDirector::sharedDirector()->getOpenGLView()->setViewPortInPoints(0, 0, texSize.width, texSize.height);

        glGetIntegerv(cc.GL_FRAMEBUFFER_BINDING, this._oldFBO);
        ccglBindFramebuffer(cc.GL_FRAMEBUFFER, this._fBO);//Will direct drawing to the frame buffer created above

        // Issue #1145
        // There is no need to enable the default GL states here
        // but since CCRenderTexture is mostly used outside the "render" loop
        // these states needs to be enabled.
        // Since this bug was discovered in API-freeze (very close of 1.0 release)
        // This bug won't be fixed to prevent incompatibilities with code.
        //
        // If you understand the above mentioned message, then you can comment the following line
        // and enable the gl states manually, in case you need them.

        cc.ENABLE_DEFAULT_GL_STATES();
    }
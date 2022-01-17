function () {
        // This method SHOULD be called only after openGLView_ was initialized
        cc.Assert(this._openGLView, "opengl view should not be null");

        this.setAlphaBlending(true);
        this.setDepthTest(true);
        this.setProjection(this._projection);

        // set other opengl default values
        //TODO OpenGl
        //glClearColor(0.0f, 0.0f, 0.0f, 1.0f);
    }
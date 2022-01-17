function (r, g, b, a) {
        //TODO
        this.begin();

        // save clear color
        var clearColor = [0, 0, 0, 0];
        glGetFloatv(GL_COLOR_CLEAR_VALUE, clearColor);

        glClearColor(r, g, b, a);
        glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

        // restore clear color
        glClearColor(clearColor[0], clearColor[1], clearColor[2], clearColor[3]);
    }
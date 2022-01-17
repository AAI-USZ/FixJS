function (r, g, b, a, depthValue, stencilValue) {
        //TODO
        var clearColor;
        switch (arguments.length) {
            case 4:
                this.begin();

                // save clear color
                clearColor = [0, 0, 0, 0];
                glGetFloatv(GL_COLOR_CLEAR_VALUE, clearColor);

                glClearColor(r, g, b, a);
                glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

                // restore clear color
                glClearColor(clearColor[0], clearColor[1], clearColor[2], clearColor[3]);
                break;
            case 5:
                this.begin();

                // save clear color
                clearColor = [0, 0, 0, 0];
                var depthClearValue;
                glGetFloatv(GL_COLOR_CLEAR_VALUE, clearColor);
                glGetFloatv(GL_DEPTH_CLEAR_VALUE, depthClearValue);

                glClearColor(r, g, b, a);
                glClearDepth(depthValue);
                glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

                // restore clear color
                glClearColor(clearColor[0], clearColor[1], clearColor[2], clearColor[3]);
                glClearDepth(depthClearValue);
                break;
            case 6:
                this.begin();

                // save clear color
                clearColor = [0, 0, 0, 0];
                var depthClearValue;
                var stencilClearValue;
                glGetFloatv(GL_COLOR_CLEAR_VALUE, clearColor);
                glGetFloatv(GL_DEPTH_CLEAR_VALUE, depthClearValue);
                glGetIntegerv(GL_STENCIL_CLEAR_VALUE, stencilClearValue);

                glClearColor(r, g, b, a);
                glClearDepth(depthValue);
                glClearStencil(stencilValue);
                glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT | GL_STENCIL_BUFFER_BIT);

                // restore clear color
                glClearColor(clearColor[0], clearColor[1], clearColor[2], clearColor[3]);
                glClearDepth(depthClearValue);
                glClearStencil(stencilClearValue);
                break;
            default :
                throw "unknown arguments";
                break;
        }
    }
function (projection) {
        var size = this._winSizeInPixels;
        var zeye = this.getZEye();
        switch (projection) {
            case cc.CCDIRECTOR_PROJECTION_2D:
                if (this._openGLView) {
                    this._openGLView.setViewPortInPoints(0, 0, size.width, size.height);
                }
                //TODO OpenGL
                //glMatrixMode(GL_PROJECTION);
                //glLoadIdentity();
                //ccglOrtho(0, size.width, 0, size.height, -1024 * cc.CONTENT_SCALE_FACTOR(),1024 * cc.CONTENT_SCALE_FACTOR());
                //glMatrixMode(GL_MODELVIEW);
                //glLoadIdentity();
                break;

            case cc.CCDIRECTOR_PROJECTION_3D:
                if (this._openGLView) {
                    this._openGLView.setViewPortInPoints(0, 0, size.width, size.height);
                }
                //TODO OpenGl
                /*
                 glMatrixMode(GL_PROJECTION);
                 glLoadIdentity();
                 gluPerspective(60, (GLfloat)size.width/size.height, 0.5f, 1500.0f);

                 glMatrixMode(GL_MODELVIEW);
                 glLoadIdentity();
                 gluLookAt( size.width/2, size.height/2, zeye,
                 size.width/2, size.height/2, 0,
                 0.0f, 1.0f, 0.0f);*/
                break;

            case cc.CCDIRECTOR_PROJECTION_CUSTOM:
                if (this._projectionDelegate) {
                    this._projectionDelegate.updateProjection();
                }
                break;

            default:
                cc.Log("cocos2d: Director: unrecognized projecgtion");
                break;
        }

        this._projection = projection;
    }
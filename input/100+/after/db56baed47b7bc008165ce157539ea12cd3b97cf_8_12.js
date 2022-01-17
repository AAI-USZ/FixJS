function (projection) {
        var size = this._winSizeInPixels;
        var sizePoint = this._winSizeInPoints;

        if(this._openGLView){
            this._openGLView.setViewPortInPoints(0, 0, sizePoint.width, sizePoint.height);
        }

        switch (projection) {
            case cc.CCDIRECTOR_PROJECTION_2D:
                //TODO OpenGL
                /* kmGLMatrixMode(KM_GL_PROJECTION);
                kmGLLoadIdentity();
                kmMat4 orthoMatrix;
                kmMat4OrthographicProjection(&orthoMatrix, 0, size.width / CC_CONTENT_SCALE_FACTOR(), 0, size.height / CC_CONTENT_SCALE_FACTOR(), -1024, 1024 );
                kmGLMultMatrix(&orthoMatrix);
                kmGLMatrixMode(KM_GL_MODELVIEW);
                kmGLLoadIdentity();*/
                break;
            case cc.CCDIRECTOR_PROJECTION_3D:
                //TODO OpenGl
                /* float zeye = this->getZEye();

                kmMat4 matrixPerspective, matrixLookup;

                kmGLMatrixMode(KM_GL_PROJECTION);
                kmGLLoadIdentity();

                // issue #1334
                kmMat4PerspectiveProjection( &matrixPerspective, 60, (GLfloat)size.width/size.height, 0.1f, zeye*2);
                // kmMat4PerspectiveProjection( &matrixPerspective, 60, (GLfloat)size.width/size.height, 0.1f, 1500);

                kmGLMultMatrix(&matrixPerspective);

                kmGLMatrixMode(KM_GL_MODELVIEW);
                kmGLLoadIdentity();
                kmVec3 eye, center, up;
                kmVec3Fill( &eye, sizePoint.width/2, sizePoint.height/2, zeye );
                kmVec3Fill( &center, sizePoint.width/2, sizePoint.height/2, 0.0f );
                kmVec3Fill( &up, 0.0f, 1.0f, 0.0f);
                kmMat4LookAt(&matrixLookup, &eye, &center, &up);
                kmGLMultMatrix(&matrixLookup);*/
                break;
            case cc.CCDIRECTOR_PROJECTION_CUSTOM:
                if (this._projectionDelegate) {
                    this._projectionDelegate.updateProjection();
                }
                break;

            default:
                cc.Log("cocos2d: Director: unrecognized projection");
                break;
        }

        this._projection = projection;
        //ccSetProjectionMatrixDirty();
    }
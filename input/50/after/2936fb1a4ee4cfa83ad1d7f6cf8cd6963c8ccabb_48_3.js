function () {
        this._super();

        //TODO
        // TIP: don't forget to enable Alpha test
        //glEnable(GL_ALPHA_TEST);
        //glAlphaFunc(GL_GREATER, 0.0);

        cc.Director.sharedDirector().setProjection(cc.CCDIRECTOR_PROJECTION_3D);
    }
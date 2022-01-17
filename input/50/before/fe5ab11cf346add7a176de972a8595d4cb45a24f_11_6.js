function () {
        this._super();

        // TIP: 2d projection should be used
        cc.Director.sharedDirector().setProjection(cc.CCDIRECTOR_PROJECTION_2D);
    }
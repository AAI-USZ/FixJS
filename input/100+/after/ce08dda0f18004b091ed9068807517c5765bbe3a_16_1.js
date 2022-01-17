function () {
        if (cc.NODE_TRANSFORM_USING_AFFINE_MATRIX) {
            this._isTransformGLDirty = true;
        }
        this._anchorPoint = new cc.Point(0, 0);
        this._anchorPointInPoints = new cc.Point(0, 0);
        this._contentSize = new cc.Size(0, 0);

        var director = cc.Director.sharedDirector();
        this._actionManager = director.getActionManager();
        this.getActionManager = function(){return this._actionManager;} ;
        this._scheduler = director.getScheduler();
        this.getScheduler = function(){return this._scheduler;}
    }
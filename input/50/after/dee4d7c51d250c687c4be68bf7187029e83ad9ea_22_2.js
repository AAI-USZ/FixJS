function () {
        cc.Director.sharedDirector().getTouchDispatcher().removeDelegate(this);
        this._super();
    }
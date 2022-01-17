function () {
        cc.TouchDispatcher.sharedDispatcher().removeDelegate(this);
        this._super();
    }
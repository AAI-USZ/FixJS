function () {
        if(!this._actionManager)
            this._actionManager = cc.Director.sharedDirector().getActionManager();
        return this._actionManager;
    }
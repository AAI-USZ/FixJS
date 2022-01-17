function () {
        if (!this._actionManager) {
            this._actionManager = cc.Director.sharedDirector().getActionManager();
            this.getActionManager = function(){return this._actionManager;} ;
        }

        return this._actionManager;
    }
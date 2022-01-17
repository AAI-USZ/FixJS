function () {
        if(!this._scheduler)
            this._scheduler = cc.Director.sharedDirector().getScheduler();
        return this._scheduler;
    }
function () {
        if (!this._scheduler){
            this._scheduler = cc.Director.sharedDirector().getScheduler();
            this.getScheduler = function(){return this._scheduler;} ;
        }
        return this._scheduler;
    }
function () {
        this._arrayMakeObjectsPerformSelector(this._children, "onEnter");
        this.resumeSchedulerAndActions();
        this._isRunning = true;
    }
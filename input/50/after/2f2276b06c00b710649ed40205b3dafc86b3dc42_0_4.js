function () {
        this.pauseSchedulerAndActions();
        this._isRunning = false;
        this._arrayMakeObjectsPerformSelector(this._children, cc.Node.StateCallbackType.onExit);
    }
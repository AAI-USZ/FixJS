function () {
        this._arrayMakeObjectsPerformSelector(this._children, cc.Node.StateCallbackType.onEnter);
        this.resumeSchedulerAndActions();
        this._isRunning = true;
    }
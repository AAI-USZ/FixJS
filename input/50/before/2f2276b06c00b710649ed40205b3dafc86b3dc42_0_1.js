function () {
        // actions
        this.stopAllActions();
        this.unscheduleAllSelectors();

        // timers
        this._arrayMakeObjectsPerformSelector(this._children, "cleanup");
    }
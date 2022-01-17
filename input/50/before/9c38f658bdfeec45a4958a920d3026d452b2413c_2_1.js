function (target) {
        this._super(target);

        if (this._restoreOriginalFrame) {
            this._origFrame = target.displayedFrame();
        }
    }
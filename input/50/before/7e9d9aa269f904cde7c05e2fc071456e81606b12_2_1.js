function () {
        if (this._viewportStack.length === 0) {
            return undefined;
        }
        return this._viewportStack[this._viewportStack.length-1];
    }
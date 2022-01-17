function () {
        this._dispatchEvents = true;
        this._targetedHandlers = [];
        this._standardHandlers = [];
        this._handlersToAdd = [];
        this._handlersToRemove = [];
        this._toRemove = false;
        this._toAdd = false;
        this._toQuit = false;
        this._locked = false;
        cc.TouchDispatcher.registerHtmlElementEvent(cc.canvas);
        return true;
    }
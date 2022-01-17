function () {
        this._dispatchEvents = true;
        this._targetedHandlers = new Array();
        this._standardHandlers = new Array();
        this._handlersToAdd = new Array();
        this._handlersToRemove = new Array();
        this._toRemove = false;
        this._toAdd = false;
        this._toQuit = false;
        this._locked = false;
        return true;
    }
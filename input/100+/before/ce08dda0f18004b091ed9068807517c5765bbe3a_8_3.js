function () {
        this._timeScale = 1.0;

        this._updatesNegList = [];
        this._updates0List = [];
        this._updatesPosList = [];

        this._hashForUpdates = [];
        this._hashForSelectors = [];

        this._currentTarget = null;
        this._currentTargetSalvaged = false;
        this._updateHashLocked = false;

        return true;
    }
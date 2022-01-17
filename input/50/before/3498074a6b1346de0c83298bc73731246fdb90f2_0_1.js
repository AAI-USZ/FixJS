function (enabled) {
        var changed = this._enabled !== enabled;
        this._enabled = enabled;

        if (changed) {
            $(this).triggerHandler("enabledStateChange", this);
        }
    }
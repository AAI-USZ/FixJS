function (checked) {
        var changed = this._checked !== checked;
        this._checked = checked;

        if (changed) {
            $(this).triggerHandler("checkedStateChange");
        }
    }
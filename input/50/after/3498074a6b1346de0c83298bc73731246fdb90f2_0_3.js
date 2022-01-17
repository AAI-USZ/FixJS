function (name) {
        var changed = this._name !== name;
        this._name = name;

        if (changed) {
            $(this).triggerHandler("nameChange");
        }
    }
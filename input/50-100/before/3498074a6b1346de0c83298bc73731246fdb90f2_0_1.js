function () {
        var result = this._commandFn.apply(this, arguments);
        if (!result) {
            return (new $.Deferred()).resolve().promise();
        } else {
            return result;
        }
    }
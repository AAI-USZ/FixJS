function() {
        var n, v;
        return this._list(function() {
            return this._skip() && (n = this._getIntermediate(), true) && this._rule("trans", false, [], null, this["trans"]) && (v = this._getIntermediate(), true);
        }) && this._exec(n + " = " + v);
    }
function() {
        var n, v, tv;
        return this._list(function() {
            return this._skip() && (n = this._getIntermediate(), true) && this._skip() && (v = this._getIntermediate(), true) && this._rule("trans", false, [ v ], null, this["trans"]) && (tv = this._getIntermediate(), true);
        }) && this._exec(function() {
            return n + " = " + (v[0] === "binop" && v[1] === "," ? "(" + tv + ")" : tv);
        }.call(this));
    }
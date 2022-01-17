function() {
        var n, f;
        return this._rule("token", true, [ "function" ], null, this["token"]) && this._rule("token", true, [ "name" ], null, this["token"]) && (n = this._getIntermediate(), true) && this._rule("funcRest", false, [], null, this["funcRest"]) && (f = this._getIntermediate(), true) && this._exec([ "var", [ n, f ] ]);
    }
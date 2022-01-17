function() {
        return this._rule("token", true, [ "function" ], null, this["token"]) && this._rule("funcRest", false, [], null, this["funcRest"]);
    }
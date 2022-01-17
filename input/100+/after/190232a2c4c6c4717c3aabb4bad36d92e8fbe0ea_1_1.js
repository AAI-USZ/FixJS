function $func() {
    var anon, n, fs, body;
    return this._skip() && (anon = this._getIntermediate(), true) && this._rule("token", true, [ "function" ], null, this["token"]) && this._optional(function() {
        return anon && this._rule("token", true, [ "name" ], null, this["token"]);
    }) && (n = this._getIntermediate(), true) && this._rule("token", true, [ "(" ], null, this["token"]) && this._rule("listOf", false, [ "formal", "," ], null, this["listOf"]) && (fs = this._getIntermediate(), true) && this._rule("token", true, [ ")" ], null, this["token"]) && this._rule("token", true, [ "{" ], null, this["token"]) && this._rule("srcElems", false, [], null, this["srcElems"]) && (body = this._getIntermediate(), true) && this._rule("token", true, [ "}" ], null, this["token"]) && this._exec([ "func", n || null, fs, body ]);
}
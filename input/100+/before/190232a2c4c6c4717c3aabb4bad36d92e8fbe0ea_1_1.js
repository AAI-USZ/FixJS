function $funcRest() {
    var fs, body;
    return this._rule("token", true, [ "(" ], null, this["token"]) && this._rule("listOf", false, [ "formal", "," ], null, this["listOf"]) && (fs = this._getIntermediate(), true) && this._rule("token", true, [ ")" ], null, this["token"]) && this._rule("token", true, [ "{" ], null, this["token"]) && this._rule("srcElems", false, [], null, this["srcElems"]) && (body = this._getIntermediate(), true) && this._rule("token", true, [ "}" ], null, this["token"]) && this._exec([ "func", fs, body ]);
}
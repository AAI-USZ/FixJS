function $srcElem() {
    var s;
    return (this._atomic(function() {
        return this._rule("func", false, [ false ], null, this["func"]);
    }) || this._atomic(function() {
        return this._rule("stmt", false, [], null, this["stmt"]);
    })) && (s = this._getIntermediate(), true) && this._exec([ "stmt", s ]);
}
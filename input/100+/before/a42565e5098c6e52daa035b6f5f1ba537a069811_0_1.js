function $arr() {
    var xs;
    return this._any(function() {
        return this._atomic(function() {
            return this._rule("trans", false, [], null, this["trans"]);
        });
    }) && (xs = this._getIntermediate(), true) && this._exec("[" + xs.join(",") + "]");
}
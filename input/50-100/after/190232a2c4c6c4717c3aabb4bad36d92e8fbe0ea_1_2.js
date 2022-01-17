function $stmt() {
    var s;
    return this._rule("trans", false, [], null, this["trans"]) && (s = this._getIntermediate(), true) && this._exec([ "stmt", s ]);
}
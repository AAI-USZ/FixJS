function $default() {
    var y;
    return this._rule("trans", false, [], null, this["trans"]) && (y = this._getIntermediate(), true) && this._exec([ "default", y ]);
}
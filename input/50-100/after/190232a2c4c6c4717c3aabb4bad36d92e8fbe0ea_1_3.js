function $unop() {
    var op, x;
    return this._skip() && (op = this._getIntermediate(), true) && this._rule("trans", false, [], null, this["trans"]) && (x = this._getIntermediate(), true) && this._exec(op + x);
}
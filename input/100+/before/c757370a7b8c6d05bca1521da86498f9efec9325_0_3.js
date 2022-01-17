function $binop() {
    var op, x, y;
    return this._skip() && (op = this._getIntermediate(), true) && this._rule("trans", false, [], null, this["trans"]) && (x = this._getIntermediate(), true) && this._rule("trans", false, [], null, this["trans"]) && (y = this._getIntermediate(), true) && this._exec(x + " " + op + " " + y);
}
function $binop() {
    var op, prevOp, $l8, $l9, x, y;
    return this._skip() && (op = this._getIntermediate(), true) && this._exec(this.op) && (prevOp = this._getIntermediate(), true) && ($l8 = this, $l9 = $l8.op, $l8.op = op, true) && (this._rule("trans", false, [], null, this["trans"]) && (x = this._getIntermediate(), true) && this._rule("trans", false, [], null, this["trans"]) && (y = this._getIntermediate(), true) && this._exec(function() {
        var res = x + " " + op + " " + y;
        if (BSJSTranslator.comparePriorities(prevOp, op)) {
            res = "(" + res + ")";
        }
        return res;
    }.call(this)) && ($l8.op = $l9, true) || ($l8.op = $l9, false));
}
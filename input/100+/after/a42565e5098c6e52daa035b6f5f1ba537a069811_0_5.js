function $mset() {
    var prevOp, lhs, op, $l8, $l9, rhs;
    return this._exec(this.op) && (prevOp = this._getIntermediate(), true) && this._rule("trans", false, [], null, this["trans"]) && (lhs = this._getIntermediate(), true) && this._skip() && (op = this._getIntermediate(), true) && ($l8 = this, $l9 = $l8.op, $l8.op = op + "=", true) && (this._rule("trans", false, [], null, this["trans"]) && (rhs = this._getIntermediate(), true) && this._exec(function() {
        if (BSJSTranslator.comparePriorities(prevOp, op + "=")) {
            return "(" + lhs + " " + op + "= " + rhs + ")";
        } else {
            return lhs + " " + op + "= " + rhs;
        }
    }.call(this)) && ($l8.op = $l9, true) || ($l8.op = $l9, false));
}
function $mset() {
    var prevOp, lhs, op, $l6, $l7, rhs;
    return this._exec(this.op) && (prevOp = this._getIntermediate(), true) && this._rule("trans", false, [], null, this["trans"]) && (lhs = this._getIntermediate(), true) && this._skip() && (op = this._getIntermediate(), true) && ($l6 = this, $l7 = $l6.op, $l6.op = op + "=", true) && (this._rule("trans", false, [], null, this["trans"]) && (rhs = this._getIntermediate(), true) && this._exec(function() {
        if (BSJSTranslator.comparePriorities(prevOp, op + "=")) {
            return "(" + lhs + " " + op + "= " + rhs + ")";
        } else {
            return lhs + " " + op + "= " + rhs;
        }
    }.call(this)) && ($l6.op = $l7, true) || ($l6.op = $l7, false));
}
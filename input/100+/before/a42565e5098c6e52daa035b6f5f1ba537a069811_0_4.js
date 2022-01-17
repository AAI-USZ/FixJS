function $set() {
    var prevOp, lhs, $l4, $l5, rhs;
    return this._exec(this.op) && (prevOp = this._getIntermediate(), true) && this._rule("trans", false, [], null, this["trans"]) && (lhs = this._getIntermediate(), true) && ($l4 = this, $l5 = $l4.op, $l4.op = "=", true) && (this._rule("trans", false, [], null, this["trans"]) && (rhs = this._getIntermediate(), true) && this._exec(function() {
        if (BSJSTranslator.comparePriorities(prevOp, "=")) {
            return "(" + lhs + " = " + rhs + ")";
        } else {
            return lhs + " = " + rhs;
        }
    }.call(this)) && ($l4.op = $l5, true) || ($l4.op = $l5, false));
}
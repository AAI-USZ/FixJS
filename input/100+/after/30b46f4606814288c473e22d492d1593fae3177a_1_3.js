function $set() {
    var lhs, $l4, $l5, $l6, $l7, rhs;
    return this._rule("trans", false, [], null, this["trans"]) && (lhs = this._getIntermediate(), true) && ($l4 = this, $l5 = $l4.noComma, $l4.noComma = true, $l6 = this, $l7 = $l6.op, $l6.op = "=", true) && (this._rule("trans", false, [], null, this["trans"]) && (rhs = this._getIntermediate(), true) && this._exec(function() {
        if (this.asgnParens) {
            return "(" + lhs + " = " + rhs + ")";
        } else {
            return lhs + " = " + rhs;
        }
    }.call(this)) && ($l4.noComma = $l5, $l6.op = $l7, true) || ($l4.noComma = $l5, $l6.op = $l7, false));
}
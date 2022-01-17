function $mset() {
    var lhs, op, $l4, $l5, rhs;
    return this._rule("trans", false, [], null, this["trans"]) && (lhs = this._getIntermediate(), true) && this._skip() && (op = this._getIntermediate(), true) && ($l4 = this, $l5 = $l4.noComma, $l4.noComma = true, true) && (this._rule("trans", false, [], null, this["trans"]) && (rhs = this._getIntermediate(), true) && this._exec(function() {
        if (this.asgnParens) {
            return "(" + lhs + " " + op + "= " + rhs + ")";
        } else {
            return lhs + " " + op + "= " + rhs;
        }
    }.call(this)) && ($l4.noComma = $l5, true) || ($l4.noComma = $l5, false));
}
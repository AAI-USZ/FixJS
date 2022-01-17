function $mset() {
    var lhs, op, $l8, $l9, $l10, $l11, rhs;
    return this._rule("trans", false, [], null, this["trans"]) && (lhs = this._getIntermediate(), true) && this._skip() && (op = this._getIntermediate(), true) && ($l8 = this, $l9 = $l8.noComma, $l8.noComma = true, $l10 = this, $l11 = $l10.op, $l10.op = op + "=", true) && (this._rule("trans", false, [], null, this["trans"]) && (rhs = this._getIntermediate(), true) && this._exec(function() {
        if (this.asgnParens) {
            return "(" + lhs + " " + op + "= " + rhs + ")";
        } else {
            return lhs + " " + op + "= " + rhs;
        }
    }.call(this)) && ($l8.noComma = $l9, $l10.op = $l11, true) || ($l8.noComma = $l9, $l10.op = $l11, false));
}
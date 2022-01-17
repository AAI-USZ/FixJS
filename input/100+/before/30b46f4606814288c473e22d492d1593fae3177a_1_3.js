function $set() {
    var lhs, $l2, $l3, rhs;
    return this._rule("trans", false, [], null, this["trans"]) && (lhs = this._getIntermediate(), true) && ($l2 = this, $l3 = $l2.noComma, $l2.noComma = true, true) && (this._rule("trans", false, [], null, this["trans"]) && (rhs = this._getIntermediate(), true) && this._exec(function() {
        if (this.asgnParens) {
            return "(" + lhs + " = " + rhs + ")";
        } else {
            return lhs + " = " + rhs;
        }
    }.call(this)) && ($l2.noComma = $l3, true) || ($l2.noComma = $l3, false));
}
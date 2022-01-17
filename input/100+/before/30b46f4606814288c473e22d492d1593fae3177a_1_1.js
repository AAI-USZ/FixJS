function $unop() {
    var op, t, $l0, $l1, tx;
    return this._skip() && (op = this._getIntermediate(), true) && this._skip() && (t = this._getIntermediate(), true) && ($l0 = this, $l1 = $l0.asgnParens, $l0.asgnParens = true, true) && (this._rule("trans", false, [ t ], null, this["trans"]) && (tx = this._getIntermediate(), true) && this._exec(function() {
        if (t[0] === "binop") tx = "(" + tx + ")";
        if (op === "typeof" || op === "void" || op === "delete") {
            return op + " " + tx;
        } else {
            return op + tx;
        }
    }.call(this)) && ($l0.asgnParens = $l1, true) || ($l0.asgnParens = $l1, false));
}
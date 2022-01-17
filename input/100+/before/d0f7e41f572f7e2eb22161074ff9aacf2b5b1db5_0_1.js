function $unop() {
    var op, $l0, $l1, t;
    return this._skip() && (op = this._getIntermediate(), true) && ($l0 = this, $l1 = $l0.op, $l0.op = op, true) && (this._rule("trans", false, [], null, this["trans"]) && (t = this._getIntermediate(), true) && this._exec(function() {
        if (op === "typeof" || op === "void" || op === "delete") {
            return op + " " + t;
        } else {
            return op + t;
        }
    }.call(this)) && ($l0.op = $l1, true) || ($l0.op = $l1, false));
}
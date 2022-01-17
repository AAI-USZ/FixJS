function $unop() {
    var op, prevOp, $l0, $l1, t;
    return this._skip() && (op = this._getIntermediate(), true) && this._exec(this.op) && (prevOp = this._getIntermediate(), true) && ($l0 = this, $l1 = $l0.op, $l0.op = "u" + op, true) && (this._rule("trans", false, [], null, this["trans"]) && (t = this._getIntermediate(), true) && this._exec(function() {
        var res;
        if (op === "typeof" || op === "void" || op === "delete") {
            res = op + " " + t;
        } else {
            res = op + t;
        }
        if (BSJSTranslator.comparePriorities(prevOp, "u" + op)) {
            res = "(" + res + ")";
        }
        return res;
    }.call(this)) && ($l0.op = $l1, true) || ($l0.op = $l1, false));
}
function $unop() {
    var op, prevOp, $l2, $l3, t;
    return this._skip() && (op = this._getIntermediate(), true) && this._exec(this.op) && (prevOp = this._getIntermediate(), true) && ($l2 = this, $l3 = $l2.op, $l2.op = "u" + op, true) && (this._rule("trans", false, [], null, this["trans"]) && (t = this._getIntermediate(), true) && this._exec(function() {
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
    }.call(this)) && ($l2.op = $l3, true) || ($l2.op = $l3, false));
}
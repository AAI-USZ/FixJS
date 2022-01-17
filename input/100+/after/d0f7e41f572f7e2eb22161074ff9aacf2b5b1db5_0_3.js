function $postop() {
    var op, prevOp, $l12, $l13, x;
    return this._skip() && (op = this._getIntermediate(), true) && this._exec(this.op) && (prevOp = this._getIntermediate(), true) && ($l12 = this, $l13 = $l12.op, $l12.op = "u" + op, true) && (this._rule("trans", false, [], null, this["trans"]) && (x = this._getIntermediate(), true) && this._exec(function() {
        var res = x + op;
        if (BSJSTranslator.comparePriorities(prevOp, "u" + op)) {
            res = "(" + res + ")";
        }
        return res;
    }.call(this)) && ($l12.op = $l13, true) || ($l12.op = $l13, false));
}
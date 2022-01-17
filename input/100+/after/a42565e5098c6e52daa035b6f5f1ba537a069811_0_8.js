function $postop() {
    var op, prevOp, $l14, $l15, x;
    return this._skip() && (op = this._getIntermediate(), true) && this._exec(this.op) && (prevOp = this._getIntermediate(), true) && ($l14 = this, $l15 = $l14.op, $l14.op = "u" + op, true) && (this._rule("trans", false, [], null, this["trans"]) && (x = this._getIntermediate(), true) && this._exec(function() {
        var res = x + op;
        if (BSJSTranslator.comparePriorities(prevOp, "u" + op)) {
            res = "(" + res + ")";
        }
        return res;
    }.call(this)) && ($l14.op = $l15, true) || ($l14.op = $l15, false));
}
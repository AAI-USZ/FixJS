function $preop() {
    var op, prevOp, $l10, $l11, x;
    return this._skip() && (op = this._getIntermediate(), true) && this._exec(this.op) && (prevOp = this._getIntermediate(), true) && ($l10 = this, $l11 = $l10.op, $l10.op = "u" + op, true) && (this._rule("trans", false, [], null, this["trans"]) && (x = this._getIntermediate(), true) && this._exec(function() {
        var res = op + x;
        if (BSJSTranslator.comparePriorities(prevOp, "u" + op)) {
            res = "(" + res + ")";
        }
        return res;
    }.call(this)) && ($l10.op = $l11, true) || ($l10.op = $l11, false));
}
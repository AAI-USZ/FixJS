function $condExpr() {
    var prevOp, $l10, $l11, cond, t, e;
    return this._exec(this.op) && (prevOp = this._getIntermediate(), true) && ($l10 = this, $l11 = $l10.op, $l10.op = "?:", true) && (this._rule("trans", false, [], null, this["trans"]) && (cond = this._getIntermediate(), true) && this._rule("trans", false, [], null, this["trans"]) && (t = this._getIntermediate(), true) && this._rule("trans", false, [], null, this["trans"]) && (e = this._getIntermediate(), true) && this._exec(function() {
        var res = cond + "?" + t + ":" + e;
        if (BSJSTranslator.comparePriorities(prevOp, "?:")) {
            res = "(" + res + ")";
        }
        return res;
    }.call(this)) && ($l10.op = $l11, true) || ($l10.op = $l11, false));
}
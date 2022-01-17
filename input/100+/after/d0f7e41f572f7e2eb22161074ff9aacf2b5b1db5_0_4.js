function $condExpr() {
    var prevOp, $l14, $l15, cond, t, e;
    return this._exec(this.op) && (prevOp = this._getIntermediate(), true) && ($l14 = this, $l15 = $l14.op, $l14.op = "?:", true) && (this._rule("trans", false, [], null, this["trans"]) && (cond = this._getIntermediate(), true) && this._rule("trans", false, [], null, this["trans"]) && (t = this._getIntermediate(), true) && this._rule("trans", false, [], null, this["trans"]) && (e = this._getIntermediate(), true) && this._exec(function() {
        var res = cond + "?" + t + ":" + e;
        if (BSJSTranslator.comparePriorities(prevOp, "?:")) {
            res = "(" + res + ")";
        }
        return res;
    }.call(this)) && ($l14.op = $l15, true) || ($l14.op = $l15, false));
}
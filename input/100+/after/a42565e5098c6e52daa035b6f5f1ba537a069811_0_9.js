function $condExpr() {
    var prevOp, $l16, $l17, cond, t, e;
    return this._exec(this.op) && (prevOp = this._getIntermediate(), true) && ($l16 = this, $l17 = $l16.op, $l16.op = "?:", true) && (this._rule("trans", false, [], null, this["trans"]) && (cond = this._getIntermediate(), true) && this._rule("trans", false, [], null, this["trans"]) && (t = this._getIntermediate(), true) && this._rule("trans", false, [], null, this["trans"]) && (e = this._getIntermediate(), true) && this._exec(function() {
        var res = cond + "?" + t + ":" + e;
        if (BSJSTranslator.comparePriorities(prevOp, "?:")) {
            res = "(" + res + ")";
        }
        return res;
    }.call(this)) && ($l16.op = $l17, true) || ($l16.op = $l17, false));
}
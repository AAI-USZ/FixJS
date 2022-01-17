function $condExpr() {
    var cond, t, e;
    return this._rule("trans", false, [], null, this["trans"]) && (cond = this._getIntermediate(), true) && this._rule("trans", false, [], null, this["trans"]) && (t = this._getIntermediate(), true) && this._rule("trans", false, [], null, this["trans"]) && (e = this._getIntermediate(), true) && this._exec("(" + cond + "?" + t + ":" + e + ")");
}
function $set() {
    var lhs, rhs;
    return this._rule("trans", false, [], null, this["trans"]) && (lhs = this._getIntermediate(), true) && this._rule("trans", false, [], null, this["trans"]) && (rhs = this._getIntermediate(), true) && this._exec("(" + lhs + "=" + rhs + ")");
}
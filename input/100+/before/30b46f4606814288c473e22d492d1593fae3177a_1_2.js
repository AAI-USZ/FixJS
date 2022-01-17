function $getp() {
    var fd, x;
    return this._rule("trans", false, [], null, this["trans"]) && (fd = this._getIntermediate(), true) && this._rule("trans", false, [], null, this["trans"]) && (x = this._getIntermediate(), true) && this._exec(x + "[" + fd + "]");
}
function $return() {
    var x;
    return this._rule("trans", false, [], null, this["trans"]) && (x = this._getIntermediate(), true) && this._exec("return " + x);
}
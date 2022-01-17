function $number() {
    var n;
    return this._skip() && (n = this._getIntermediate(), true) && this._exec("(" + n + ")");
}
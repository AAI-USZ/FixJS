function $func() {
    var args, body;
    return this._skip() && (args = this._getIntermediate(), true) && this._rule("curlyTrans", false, [], null, this["curlyTrans"]) && (body = this._getIntermediate(), true) && this._exec("(function (" + args.join(",") + ")" + body + ")");
}
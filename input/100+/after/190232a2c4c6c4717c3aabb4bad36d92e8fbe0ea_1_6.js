function $func() {
    var name, args, body;
    return this._skip() && (name = this._getIntermediate(), true) && this._skip() && (args = this._getIntermediate(), true) && this._rule("curlyTrans", false, [], null, this["curlyTrans"]) && (body = this._getIntermediate(), true) && this._exec("function " + (name || "") + "(" + args.join(",") + ")" + body);
}
function $call() {
    var fn, args;
    return this._rule("trans", false, [], null, this["trans"]) && (fn = this._getIntermediate(), true) && this._any(function() {
        return this._atomic(function() {
            return this._rule("trans", false, [], null, this["trans"]);
        });
    }) && (args = this._getIntermediate(), true) && this._exec(fn + "(" + args.join(",") + ")");
}
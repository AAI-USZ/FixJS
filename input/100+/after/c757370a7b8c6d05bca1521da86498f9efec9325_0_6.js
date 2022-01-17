function $call() {
    var fn, tfn, args;
    return this._skip() && (fn = this._getIntermediate(), true) && this._rule("trans", false, [ fn ], null, this["trans"]) && (tfn = this._getIntermediate(), true) && this._any(function() {
        return this._atomic(function() {
            return this._rule("trans", false, [], null, this["trans"]);
        });
    }) && (args = this._getIntermediate(), true) && this._exec(function() {
        if (fn[1] === null) tfn = "(" + tfn + ")";
        return tfn + "(" + args.join(",") + ")";
    }.call(this));
}
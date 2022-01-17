function $binop() {
    var op, $l6, $l7, x, y;
    return this._skip() && (op = this._getIntermediate(), true) && ($l6 = this, $l7 = $l6.asgnParens, $l6.asgnParens = true, true) && (this._rule("trans", false, [], null, this["trans"]) && (x = this._getIntermediate(), true) && this._rule("trans", false, [], null, this["trans"]) && (y = this._getIntermediate(), true) && this._exec(function() {
        var res = x + " " + op + " " + y;
        if (this.noComma && op === ",") res = "(" + res + ")";
        return res;
    }.call(this)) && ($l6.asgnParens = $l7, true) || ($l6.asgnParens = $l7, false));
}
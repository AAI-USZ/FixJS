function $binop() {
    var op, prevOp, $l12, $l13, $l14, $l15, x, y;
    return this._skip() && (op = this._getIntermediate(), true) && this._exec(this.op) && (prevOp = this._getIntermediate(), true) && ($l12 = this, $l13 = $l12.asgnParens, $l12.asgnParens = true, $l14 = this, $l15 = $l14.op, $l14.op = op, true) && (this._rule("trans", false, [], null, this["trans"]) && (x = this._getIntermediate(), true) && this._rule("trans", false, [], null, this["trans"]) && (y = this._getIntermediate(), true) && this._exec(function() {
        var res = x + " " + op + " " + y;
        if (prevOp != undefined && BSJSTranslator.opPriorities[prevOp] === undefined || BSJSTranslator.opPriorities[prevOp] < BSJSTranslator.opPriorities[op]) {
            res = "(" + res + ")";
        }
        return res;
    }.call(this)) && ($l12.asgnParens = $l13, $l14.op = $l15, true) || ($l12.asgnParens = $l13, $l14.op = $l15, false));
}
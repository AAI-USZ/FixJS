function $arr() {
    var $l0, $l1, xs;
    return ($l0 = this, $l1 = $l0.op, $l0.op = "[]", true) && (this._any(function() {
        return this._atomic(function() {
            return this._rule("trans", false, [], null, this["trans"]);
        });
    }) && (xs = this._getIntermediate(), true) && this._exec("[" + xs.join(",") + "]") && ($l0.op = $l1, true) || ($l0.op = $l1, false));
}
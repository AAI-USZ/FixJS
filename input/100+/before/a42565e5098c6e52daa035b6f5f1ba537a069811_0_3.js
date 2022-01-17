function $getp() {
    var $l2, $l3, fd, tfd, x;
    return ($l2 = this, $l3 = $l2.op, $l2.op = ".", true) && (this._skip() && (fd = this._getIntermediate(), true) && this._rule("trans", false, [ fd ], null, this["trans"]) && (tfd = this._getIntermediate(), true) && this._rule("trans", false, [], null, this["trans"]) && (x = this._getIntermediate(), true) && this._exec(function() {
        if (fd[0] === "string" && /^[$_a-z0-9][a-z0-9]*$/i.test(fd[1]) && !BSJSParser._isKeyword(fd[1])) {
            return x + "." + fd[1];
        } else {
            return x + "[" + tfd + "]";
        }
    }.call(this)) && ($l2.op = $l3, true) || ($l2.op = $l3, false));
}
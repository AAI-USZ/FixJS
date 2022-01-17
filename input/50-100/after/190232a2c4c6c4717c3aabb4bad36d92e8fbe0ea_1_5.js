function() {
        return this._atomic(function() {
            return this._rule("trans", false, [], null, this["trans"]);
        });
    }) && (props = this._getIntermediate(), true) && this._exec("{" + props.join(",") + "}
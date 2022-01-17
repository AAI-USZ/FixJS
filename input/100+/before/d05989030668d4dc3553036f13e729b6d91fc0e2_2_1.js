function (Var) {
        if (this._color == Var) {
            return;
        }
        this._color = Var;
        if (this._children && this._children.length != 0) {
            for (var i = 0, len = this._children.length; i < len; i++) {
                var node = this._children[i];
                if (node) {
                    node.setColor(this._color);
                }
            }
        }
    }
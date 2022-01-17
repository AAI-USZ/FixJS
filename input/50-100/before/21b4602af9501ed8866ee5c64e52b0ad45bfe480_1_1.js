function (newString) {
        this._string = newString;

        if (this._children) {
            for (var i = 0; i < this._children.length; i++) {
                var node = this._children[i];
                if (node) {
                    node.setIsVisible(false);
                }
            }
        }
        this.createFontChars();
    }
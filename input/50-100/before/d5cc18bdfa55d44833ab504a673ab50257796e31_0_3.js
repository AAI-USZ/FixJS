function(value){
        var c = this._outlineColor;

        if ((typeof value !== 'undefined') &&
            ((c.red !== value.red) || (c.green !== value.green) || (c.blue !== value.blue) || (c.alpha !== value.alpha))) {
            this._outlineColor = new Color(value.red, value.green, value.blue, value.alpha);
            this._makeDirty(OUTLINE_COLOR_INDEX);
        }
    }
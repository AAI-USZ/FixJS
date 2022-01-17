function(value){
        var c = this._color;

        if ((typeof value !== 'undefined') &&
            ((c.red !== value.red) || (c.green !== value.green) || (c.blue !== value.blue) || (c.alpha !== value.alpha))) {
            this._color = new Color(value.red, value.green, value.blue, value.alpha);
            this._makeDirty(COLOR_INDEX);
            }
    }
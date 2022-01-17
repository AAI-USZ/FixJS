function(layer) {
        if(this.attrs.visible) {
            this._drawChildren(layer);
        }
    }
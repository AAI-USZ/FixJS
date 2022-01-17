function(layer) {
        var date = new Date();
        var time = date.getTime();
        this.lastDrawTime = time;

        // before draw  handler
        if(this.beforeDrawFunc !== undefined) {
            this.beforeDrawFunc.call(this);
        }

        if(this.attrs.clearBeforeDraw) {
            var clearLayer = layer ? layer : this;
            clearLayer.clear();
        }

        if(this.isVisible()) {
            // draw custom func
            if(this.attrs.drawFunc !== undefined) {
                this.attrs.drawFunc.call(this);
            }

            // draw children
            this._drawChildren(layer);
        }

        // after draw  handler
        if(this.afterDrawFunc !== undefined) {
            this.afterDrawFunc.call(this);
        }
    }
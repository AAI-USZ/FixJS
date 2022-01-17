function(canvas) {
        /*
         * if canvas is not defined, then use the canvas
         * tied to the layer
         */
        if(!canvas) {
            canvas = this.getCanvas();
        }

        var date = new Date();
        var time = date.getTime();
        this.lastDrawTime = time;

        // before draw  handler
        if(this.beforeDrawFunc !== undefined) {
            this.beforeDrawFunc.call(this);
        }

        if(this.attrs.clearBeforeDraw) {
            canvas.clear();
        }

        if(this.isVisible()) {
            // draw custom func
            if(this.attrs.drawFunc !== undefined) {
                this.attrs.drawFunc.call(this);
            }

            // draw children
            this._drawChildren(canvas);
        }

        // after draw  handler
        if(this.afterDrawFunc !== undefined) {
            this.afterDrawFunc.call(this);
        }
    }
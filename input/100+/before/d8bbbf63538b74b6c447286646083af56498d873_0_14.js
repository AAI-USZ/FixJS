function(text) {
        var appliedShadow = false;
        var context = this.getContext();
        context.save();
        if(this.attrs.textStroke || this.attrs.textStrokeWidth) {
            if(this.attrs.shadow && !this.appliedShadow) {
                appliedShadow = this._applyShadow();
            }

            // defaults
            if(!this.attrs.textStroke) {
                this.attrs.textStroke = 'black';
            }
            else if(!this.attrs.textStrokeWidth && this.attrs.textStrokeWidth !== 0) {
                this.attrs.textStrokeWidth = 2;
            }
            context.lineWidth = this.attrs.textStrokeWidth;
            context.strokeStyle = this.attrs.textStroke;
            context.strokeText(text, 0, 0);
        }
        context.restore();

        if(appliedShadow) {
            this.strokeText(text, 0, 0);
        }
    }
function(context, text) {
        var appliedShadow = false;
        context.save();
        if(this.attrs.textStroke || this.attrs.textStrokeWidth) {
            if(this.attrs.shadow && !this.appliedShadow) {
                appliedShadow = this._applyShadow(context);
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
            context.strokeText(context, text, 0, 0);
        }
        context.restore();

        if(appliedShadow) {
            this.strokeText(context, text, 0, 0);
        }
    }
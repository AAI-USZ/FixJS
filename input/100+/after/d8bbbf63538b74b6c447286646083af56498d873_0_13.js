function(context, text) {
        var appliedShadow = false;
        context.save();
        if(this.attrs.textFill) {
            if(this.attrs.shadow && !this.appliedShadow) {
                appliedShadow = this._applyShadow(context);
            }
            context.fillStyle = this.attrs.textFill;
            context.fillText(text, 0, 0);
        }
        context.restore();

        if(appliedShadow) {
            this.fillText(context, text, 0, 0);
        }
    }
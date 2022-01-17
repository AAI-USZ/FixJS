function(context, text) {
        var appliedShadow = false;
        if(this.attrs.textFill) {
            context.save();
            if(this.attrs.shadow && !this.appliedShadow) {
                appliedShadow = this._applyShadow(context);
            }
            context.fillStyle = this.attrs.textFill;
            context.fillText(text, 0, 0);
            context.restore();
        }
        if(appliedShadow) {
            this.fillText(contex, text, 0, 0);
        }
    }
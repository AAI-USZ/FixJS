function(text) {
        var appliedShadow = false;
        var context = this.getContext();
        context.save();
        if(this.attrs.textFill) {
            if(this.attrs.shadow && !this.appliedShadow) {
                appliedShadow = this._applyShadow();
            }
            context.fillStyle = this.attrs.textFill;
            context.fillText(text, 0, 0);
        }
        context.restore();

        if(appliedShadow) {
            this.fillText(text, 0, 0);
        }
    }
function() {
        var appliedShadow = false;
        var context = this.getContext();
        context.save();
        var a = Array.prototype.slice.call(arguments);

        if(a.length === 5 || a.length === 9) {
            if(this.attrs.shadow && !this.appliedShadow) {
                appliedShadow = this._applyShadow();
            }
            switch(a.length) {
                case 5:
                    context.drawImage(a[0], a[1], a[2], a[3], a[4]);
                    break;
                case 9:
                    context.drawImage(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8]);
                    break;
            }
        }

        context.restore();

        if(appliedShadow) {
            this.drawImage.apply(this, a);
        }
    }
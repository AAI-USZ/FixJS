function() {
        var appliedShadow = false;
        var context = arguments[0];
        context.save();
        var a = Array.prototype.slice.call(arguments);

        if(a.length === 6 || a.length === 10) {
            if(this.attrs.shadow && !this.appliedShadow) {
                appliedShadow = this._applyShadow(context);
            }
            
            if(a.length === 6) {
                context.drawImage(a[1], a[2], a[3], a[4], a[5]);
            }
            else {
                context.drawImage(a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9]);
            }
        }

        context.restore();

        if(appliedShadow) {
            this.drawImage.apply(this, a);
        }
    }
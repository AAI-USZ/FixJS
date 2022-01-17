function() {
        var context = this.getContext();
        var s = this.attrs.shadow;
        if(s) {
            var aa = this.getAbsoluteAlpha();
            // defaults
            var color = s.color ? s.color : 'black';
            var blur = s.blur ? s.blur : 5;
            var offset = s.offset ? s.offset : {
                x: 0,
                y: 0
            };

            if(s.alpha) {
                context.globalAlpha = s.alpha * aa;
            }
            context.shadowColor = color;
            context.shadowBlur = blur;
            context.shadowOffsetX = offset.x;
            context.shadowOffsetY = offset.y;
            this.appliedShadow = true;
            return true;
        }

        return false;
    }
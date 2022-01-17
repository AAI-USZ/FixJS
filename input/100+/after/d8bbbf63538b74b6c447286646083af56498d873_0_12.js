function(context) {
        var appliedShadow = false;
        context.save();

        var fill = this.attrs.fill;

        if(fill) {
            if(this.attrs.shadow && !this.appliedShadow) {
                appliedShadow = this._applyShadow(context);
            }

            var s = fill.start;
            var e = fill.end;
            var f = null;

            // color fill
            if( typeof fill == 'string') {
                f = this.attrs.fill;
                context.fillStyle = f;
                context.fill(context);
            }
            // pattern
            else if(fill.image) {
                var repeat = !fill.repeat ? 'repeat' : fill.repeat;
                f = context.createPattern(fill.image, repeat);

                context.save();

                if(fill.scale) {
                    context.scale(fill.scale.x, fill.scale.y);
                }
                if(fill.offset) {
                    context.translate(fill.offset.x, fill.offset.y);
                }

                context.fillStyle = f;
                context.fill(context);
                context.restore();
            }
            // linear gradient
            else if(!s.radius && !e.radius) {
                var grd = context.createLinearGradient(s.x, s.y, e.x, e.y);
                var colorStops = fill.colorStops;

                // build color stops
                for(var n = 0; n < colorStops.length; n += 2) {
                    grd.addColorStop(colorStops[n], colorStops[n + 1]);
                }
                f = grd;
                context.fillStyle = f;
                context.fill(context);
            }
            // radial gradient
            else if((s.radius || s.radius === 0) && (e.radius || e.radius === 0)) {
                var grd = context.createRadialGradient(s.x, s.y, s.radius, e.x, e.y, e.radius);
                var colorStops = fill.colorStops;

                // build color stops
                for(var n = 0; n < colorStops.length; n += 2) {
                    grd.addColorStop(colorStops[n], colorStops[n + 1]);
                }
                f = grd;
                context.fillStyle = f;
                context.fill(context);
            }
            else {
                f = 'black';
                context.fillStyle = f;
                context.fill(context);
            }
        }
        context.restore();

        if(appliedShadow) {
            this.fill(context);
        }
    }
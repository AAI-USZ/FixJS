function(context) {
            context.beginPath();
            context.moveTo(this.attrs.points[0].x, this.attrs.points[0].y);
            for(var n = 1; n < this.attrs.points.length; n++) {
                context.lineTo(this.attrs.points[n].x, this.attrs.points[n].y);
            }
            context.closePath();
            this.fill(context);
            this.stroke(context);
        }
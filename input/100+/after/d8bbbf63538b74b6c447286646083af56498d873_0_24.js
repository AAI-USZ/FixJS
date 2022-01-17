function(context) {
            context.beginPath();
            context.moveTo(0, 0 - this.attrs.radius);

            for(var n = 1; n < this.attrs.sides; n++) {
                var x = this.attrs.radius * Math.sin(n * 2 * Math.PI / this.attrs.sides);
                var y = -1 * this.attrs.radius * Math.cos(n * 2 * Math.PI / this.attrs.sides);
                context.lineTo(x, y);
            }
            context.closePath();
            this.fill(context);
            this.stroke(context);
        }
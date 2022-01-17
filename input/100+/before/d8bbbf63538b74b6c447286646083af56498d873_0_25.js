function() {
            var context = this.getContext();
            context.beginPath();
            context.moveTo(0, 0 - this.attrs.outerRadius);

            for(var n = 1; n < this.attrs.numPoints * 2; n++) {
                var radius = n % 2 === 0 ? this.attrs.outerRadius : this.attrs.innerRadius;
                var x = radius * Math.sin(n * Math.PI / this.attrs.numPoints);
                var y = -1 * radius * Math.cos(n * Math.PI / this.attrs.numPoints);
                context.lineTo(x, y);
            }
            context.closePath();

            this.fill();
            this.stroke();
        }
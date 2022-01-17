function(x, y) {

            var size   = this.get('size'),
                center = this.findCenter();

            x = this.canvas.width - (this.canvas.width - x) - center.x;
            y = this.canvas.height - (this.canvas.height - y) - center.y;

            return {
                x: floorTo(x, size) / size,
                y: floorTo(y, size) / size
            };
        }
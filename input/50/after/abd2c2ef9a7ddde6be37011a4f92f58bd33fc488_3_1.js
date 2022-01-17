function() {

            var size = this.get('size');

            this.canvas.width  = floorTo(window.innerWidth, size);
            this.canvas.height = floorTo(window.innerHeight, size);

            return this;
        }
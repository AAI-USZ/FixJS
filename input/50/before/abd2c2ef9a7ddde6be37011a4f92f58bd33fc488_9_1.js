function() {

            var size = this.get('size');

            this.canvas.width  = roundTo(window.innerWidth, size);
            this.canvas.height = roundTo(window.innerHeight, size);

            return this;
        }
function() {

            var size = this.get('size');

            // We round to the width/height to make rendering more efficient
            // and significantly clearer
            this.canvas.width = document.width.roundTo(size);
            this.canvas.height = document.height.roundTo(size);

            return this;
        }
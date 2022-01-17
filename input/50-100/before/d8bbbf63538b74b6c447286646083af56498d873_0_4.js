function(layer) {
        layer.canvas.width = this.attrs.width;
        layer.canvas.height = this.attrs.height;

        // draw layer and append canvas to container
        layer.draw();
        this.content.appendChild(layer.canvas);

        /*
         * set layer last draw time to zero
         * so that throttling doesn't take into account
         * the layer draws associated with adding a node
         */
        layer.lastDrawTime = 0;
    }
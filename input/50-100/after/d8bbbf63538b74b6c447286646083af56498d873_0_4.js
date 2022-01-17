function(layer) {
        layer.canvas.setSize(this.attrs.width, this.attrs.height);

        // draw layer and append canvas to container
        layer.draw();
        this.content.appendChild(layer.canvas.element);

        /*
         * set layer last draw time to zero
         * so that throttling doesn't take into account
         * the layer draws associated with adding a node
         */
        layer.lastDrawTime = 0;
    }
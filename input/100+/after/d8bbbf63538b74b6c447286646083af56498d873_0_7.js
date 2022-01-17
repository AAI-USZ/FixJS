function() {
        var width = this.attrs.width;
        var height = this.attrs.height;

        // set content dimensions
        this.content.style.width = width + 'px';
        this.content.style.height = height + 'px';

        // set buffer canvas and path canvas sizes
        this.bufferCanvas.setSize(width, height);
        this.pathCanvas.setSize(width, height);

        // set user defined layer dimensions
        var layers = this.children;
        for(var n = 0; n < layers.length; n++) {
            var layer = layers[n];
            layer.getCanvas().setSize(width, height);
            layer.draw();
        }
    }
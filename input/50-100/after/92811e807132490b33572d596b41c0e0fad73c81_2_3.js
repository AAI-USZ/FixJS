function(image)
    {
        var prev_width = this.original_dim.width,
            prev_height = this.original_dim.height;

        this.original_dim = {
            width: image.naturalWidth,
            height: image.naturalHeight
        };

        this.image.setImage(image);

        if (prev_width !== this.original_dim.width ||
            prev_height !== this.original_dim.height)
        {
            this.fitImageToStage(image);
        }
        this.updateViewportDragBounds();
        this.layer.draw();
    }
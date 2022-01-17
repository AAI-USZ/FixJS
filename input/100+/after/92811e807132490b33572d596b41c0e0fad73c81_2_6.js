function(viewport_size)
    {
        var offset_pos = this.image.getAbsolutePosition();

        var width = (viewport_size.right - viewport_size.left )/ this.scale_x;
        var height = (viewport_size.bottom - viewport_size.top ) / this.scale_y;
        var ratio = this.natural_dim.width / this.natural_dim.height;
        var zoom_y = this.stage.getHeight() / height;
        var zoom_x = this.stage.getWidth() / width;
        var image_height = (this.natural_dim.height / this.scale_y) * zoom_y;
        var image_width = image_height * ratio;
        var x = -(viewport_size.left / this.scale_x) * zoom_x;
        var y = -(viewport_size.top / this.scale_y) * zoom_y;

        this.image.setHeight(image_height);
        this.image.setWidth(image_width);
        this.image.setX(x);
        this.image.setY(y);

        this.scale_x = this.natural_dim.width / image_width;
        this.scale_y = this.natural_dim.height / image_height;

        this.setImageDragBounds({ top: y, right: (x + image_width), bottom: (y + image_height), left: x });
        this.updateViewportDragBounds();

        this.layer.draw();

        this.options.onSelectionChanged(
            this.getCurrentSelection()
        );
    }
function(viewport_dims)
    {
        var offset_pos = this.image.getAbsolutePosition();

        var x = (viewport_dims.left / this.scale_x) + offset_pos.x;
        var y = (viewport_dims.top / this.scale_y) + offset_pos.y;
        var width = (viewport_dims.right - viewport_dims.left )/ this.scale_x;
        var height = (viewport_dims.bottom - viewport_dims.top ) / this.scale_y;

        this.viewport_rect.setWidth(width);
        this.viewport_rect.setHeight(height);
        this.viewport_rect.setX(x);
        this.viewport_rect.setY(y);
        this.layer.draw();
    }
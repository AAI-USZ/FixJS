function(viewport_size)
    {
        var offset_pos = this.image.getAbsolutePosition();

        var x = (viewport_size.left / this.scale_x) + offset_pos.x;
        var y = (viewport_size.top / this.scale_y) + offset_pos.y;
        var width = (viewport_size.right - viewport_size.left )/ this.scale_x;
        var height = (viewport_size.bottom - viewport_size.top ) / this.scale_y;

        this.viewport_rect.setWidth(width);
        this.viewport_rect.setHeight(height);
        this.viewport_rect.setX(x);
        this.viewport_rect.setY(y);
        this.updateViewportDragBounds();
        this.layer.draw();
    }
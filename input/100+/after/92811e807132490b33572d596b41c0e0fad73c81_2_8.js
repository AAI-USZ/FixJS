function(event, delta, delta_x, delta_y)
    {
        if (! this.orig_viewport_size)
        {
            this.orig_viewport_size = {
                width: this.viewport_rect.getWidth(),
                height: this.viewport_rect.getHeight(),
                x: this.viewport_rect.getX(),
                y: this.viewport_rect.getY()
            };
        }
        delta_x = -Math.ceil(delta_x);
        delta_y = -Math.ceil(delta_y);

        var x, y, 
            ratio = this.orig_viewport_size.width / this.orig_viewport_size.height,
            new_height = this.viewport_rect.getHeight() + delta_y,
            new_width = new_height * ratio,
            max_height = this.orig_viewport_size.height,
            min_height = 15,
            stg_width = this.stage.getWidth(),
            stg_height = this.stage.getHeight();

        if (this.viewport_rect.getHeight() === max_height && 0 < delta_y || this.viewport_rect.getHeight() === min_height && 0 > delta_y)
        {
            return false;
        }
        else if (new_height >= max_height)
        {
            x = this.orig_viewport_size.x;
            y = this.orig_viewport_size.y;
            new_height = max_height;
            new_width = new_height * ratio;
        }
        else if(new_height <= min_height)
        {
            new_height = min_height;
            new_width = new_height * ratio;
            x = (stg_width / 2) - (new_width / 2);
            y = (stg_height / 2) - (new_height / 2);
        }
        else
        {
            x = (stg_width / 2) - (new_width / 2);
            y = (stg_height / 2) - (new_height / 2);
        }

        this.viewport_rect.setX(x);
        this.viewport_rect.setY(y);
        this.viewport_rect.setHeight(new_height);
        this.viewport_rect.setWidth(new_width);

        this.updateViewportDragBounds();

        this.layer.draw();

        this.options.onViewportChanged(
            this.translateDimensions(
                this.getRelativeViewportBounds()
            )
        );
        return false;
    }
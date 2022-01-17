function(event, delta, delta_x, delta_y)
    {
        delta_x = Math.ceil(delta_x);
        delta_y = Math.ceil(delta_y);  

        var x, y, 
            ratio = this.natural_dim.width / this.natural_dim.height,
            new_height = this.image.getHeight() + delta_y,
            new_width = new_height * ratio,
            min_height = this.original_bounds.bottom - this.original_bounds.top,
            stg_width = this.stage.getWidth(),
            stg_height = this.stage.getHeight();

        if (this.image.getHeight() === min_height && 0 >= delta_y)
        {
            return false;
        }
        else if (new_height < min_height)
        {
            x = this.original_bounds.left;
            y = this.original_bounds.top;
            new_height = min_height;
            new_width = new_height * ratio;
        }
        else
        {
            x = (stg_width / 2) - (new_width / 2);
            y = (stg_height / 2) - (new_height / 2);
        }

        this.image.setX(x);
        this.image.setY(y);
        this.image.setHeight(new_height);
        this.image.setWidth(new_width);

        this.scale_x = this.natural_dim.width / new_width;
        this.scale_y = this.natural_dim.height / new_height;

        this.setImageDragBounds({ top: y, right: (x + new_width), bottom: (y + new_height), left: x });
        this.updateViewportDragBounds();

        this.layer.draw();

        this.options.onViewportChanged(
            this.translateDimensions({ top: -y, right: (-x + stg_width), bottom: (-y + stg_height), left: -x })
        );
        this.options.onSelectionChanged(
            this.getCurrentSelection()
        );
        return false;
    }
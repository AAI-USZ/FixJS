function(image)
    {
        var width = image.naturalWidth,
            height = image.naturalHeight,
            ratio = width / height,
            stg_width = this.stage.getWidth(),
            stg_height = this.stage.getHeight(),
            stg_ratio = stg_width / stg_height,
            new_width, new_height;
        // Take care of max size (stage size) limits

        if (stg_ratio <= ratio && stg_width < width)
        {
            new_width = stg_width;
            new_height = new_width / ratio;
        }
        else if (stg_ratio > ratio && stg_height < height)
        {
            new_height = stg_height;
            new_width = new_height * ratio;
        }
        else
        {
            new_width = width;
            new_height = height;
        }
        this.scale_x = width / new_width;
        this.scale_y = height / new_height;

        this.image.setHeight(new_height);
        this.image.setWidth(new_width);

        var x = (stg_width / 2) - (new_width / 2),
            y = (stg_height / 2) - (new_height / 2);

        this.image.setX(x);
        this.image.setY(y);
    }
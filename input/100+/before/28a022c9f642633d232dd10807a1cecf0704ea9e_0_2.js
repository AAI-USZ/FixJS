function(handle_index, delta)
    {
        var selection = DefaultMode.prototype.apply.call(this, handle_index, delta); // luke, I am your father!

        var image_selection = this.interaction.getImageSelection(),
            dir = ResizeInteraction.DIRECTION,
            direction = this.determineResizeDirection(handle_index, delta),
            dimensions = selection.dim,
            position = selection.pos,
            selection_rect = image_selection.getSelectionRect(),
            selection_pos = selection_rect.getAbsolutePosition();

        var reposition_x = [0, 6], reposition_y = [0, 2];
        if (direction === dir.HORIZONTAL)
        {
            var new_height = dimensions.width / image_selection.ratio;
            if (-1 !== reposition_y.indexOf(handle_index))
            {
                position.y = selection_pos.y - (new_height - selection_rect.getHeight());
            }
            dimensions.height = new_height;
        }
        else
        {
            var new_width = dimensions.height * image_selection.ratio;
            if (-1 !== reposition_x.indexOf(handle_index))
            {
                position.x = selection_pos.x - (new_width - selection_rect.getWidth());
            }
            dimensions.width = new_width;
        }
        return { pos: position, dim: dimensions };
    }
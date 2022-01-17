function(handle_index, delta)
    {
        var selection = DefaultMode.prototype.apply.call(this, handle_index, delta); // luke, I am your father!

        var image_selection = this.interaction.getImageSelection(),
            dir = ResizeInteraction.DIRECTION,
            direction = this.determineResizeDirection(handle_index, delta),
            dimensions = selection.dim,
            position = selection.pos,
            boundry = this.interaction.getBoundry(),
            selection_rect = image_selection.getSelectionRect(),
            selection_pos = selection_rect.getAbsolutePosition();

        // Calculate the position and dimensions depending on the given ration.
        var reposition_x = [0, 6], reposition_y = [0, 2]; // handles that require repositioning of the select rect
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

        // Correct 
        if (position.x + dimensions.width >= boundry.right)
        {
            dimensions.width = boundry.right - position.x;
            dimensions.height = dimensions.width / image_selection.ratio;
        }
        else if (position.x <= boundry.left)
        {
            var right_bound = position.x + dimensions.width;
            position.x = boundry.left;
            dimensions.width = right_bound - position.x;
            dimensions.height = dimensions.width / image_selection.ratio;
        }
        if (position.y + dimensions.height >= boundry.bottom)
        {
            dimensions.height = boundry.bottom - position.y;
            dimensions.width = dimensions.height * image_selection.ratio;
        }
        else if (position.y <= boundry.top)
        {
            var bottom_bound = position.y + dimensions.height;
            position.y = boundry.top;
            dimensions.height = top_bound - position.y;
            dimensions.width = dimensions.height * image_selection.ratio;
        }

        return { pos: position, dim: dimensions };
    }
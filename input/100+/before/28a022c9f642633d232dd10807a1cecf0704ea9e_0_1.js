function(handle_index, delta)
        {
            var image_selection = this.interaction.getImageSelection();

            // Setup vars required for calculation.
            var selection_rect = image_selection.getSelectionRect(),
                width = selection_rect.getWidth(),
                height = selection_rect.getHeight();

            var dir = ResizeInteraction.DIRECTION,
                direction = this.determineResizeDirection(handle_index, delta);

            width += (direction === dir.HORIZONTAL || direction === dir.BOTH) ? delta.x : 0;
            height += (direction === dir.VERTICAL || direction === dir.BOTH) ? delta.y : 0;

            return { width: width, height: height };
        }
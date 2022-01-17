function(mousemove_event, handle_index)
        {
            var evt_pos = { x: mousemove_event.pageX, y: mousemove_event.pageY },
                selection_rect = this.image_selection.getSelectionRect(),
                selection_pos = selection_rect.getAbsolutePosition(),
                selection_width = selection_rect.getWidth(),
                selection_height = selection_rect.getHeight(),
                delta = this.calculateEventDelta(handle_index, evt_pos);

            this.image_selection.setSelection(
                this.mode.buildSelectGeometry(handle_index, delta)
            );

            this.last_mousepos = evt_pos;
        }
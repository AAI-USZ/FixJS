function(selection)
    {
        this.selection_rect.setWidth(selection.dim.width);
        this.selection_rect.setHeight(selection.dim.height);

        this.shapes_group.setX(selection.pos.x);
        this.shapes_group.setY(selection.pos.y);

        this.correctResizeHandlePositions();
        this.resize_overlay.update();

        this.updateDragBounds();
        this.layer.draw();

        this.options.onSelectionChanged(
            this.getSelection(true)
        );
    }
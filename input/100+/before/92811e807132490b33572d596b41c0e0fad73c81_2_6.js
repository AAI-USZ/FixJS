function()
    {
        var relative_to = this.image.getAbsolutePosition();
        return this.translateDimensions(
            this.image_selection.getSelection(relative_to)
        );
    }
function (editable) {
    var options;
    this.editable = editable;
    if (!this.drawingManager) {
        this._initDrawingManager();
    }
    if (editable) {  // Enable
        this.drawingManagerOptions.drawingMode = null;
        if (this.options.defaultDrawingControl) {
            this.drawingManagerOptions.drawingControl = true;
        }
        this.setCurrentFeature(this.currentFeature);
        if (this.editToolbar) {
            this.editToolbar.show();
        }
        if (this.mainPanel) {
            this.mainPanel.show();
        }
    } else {  // Disable
        this.drawingManagerOptions.drawingMode = null;
        if (this.options.defaultDrawingControl) {
            this.drawingManagerOptions.drawingControl = false;
        }
        if (this.currentFeature && this.currentFeature.setEditable) {
            this.currentFeature.setEditable(false);
        }
        if (this.editToolbar) {
            this.editToolbar.hide();
        }
        if (this.mainPanel) {
            this.mainPanel.hide();
        }
        this.setEditMode(null);
    }
    if (this.drawingManager) {
        this.drawingManager.setOptions(this.drawingManagerOptions);
    }
}
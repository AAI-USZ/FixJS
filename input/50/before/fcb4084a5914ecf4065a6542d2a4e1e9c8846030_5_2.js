function()
    {
        WebInspector.inspectorView.setCurrentPanel(this);
        WebInspector.OpenResourceDialog.show(this, this._uiSourceCodeProvider, this.editorView.mainElement);
    }
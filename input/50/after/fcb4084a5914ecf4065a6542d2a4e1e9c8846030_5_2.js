function()
    {
        WebInspector.inspectorView.setCurrentPanel(this);
        WebInspector.OpenResourceDialog.show(this, this._workspace, this.editorView.mainElement);
    }
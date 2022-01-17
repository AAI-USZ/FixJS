function()
    {
        var panelName = WebInspector.inspectorView.currentPanel() && WebInspector.inspectorView.currentPanel().toolbarItemLabel;
        if (!panelName)
            return;
        var newLabel = WebInspector.UIString("Search %s", panelName);
        this._searchInputElement.setAttribute("placeholder", newLabel);
    }
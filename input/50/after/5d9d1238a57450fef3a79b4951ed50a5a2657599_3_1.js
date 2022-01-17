function()
    {
        this._searchInputElement.value = "";
        this._performSearch("");
        WebInspector.inspectorView.setFooterElement(null);
    }
function()
    {
        WebInspector.inspectorView.setFooterElement(this._element);
        this._searchInputElement.focus();
        this._searchInputElement.select();
    }
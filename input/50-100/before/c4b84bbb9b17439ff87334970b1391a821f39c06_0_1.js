function(resource, content, majorChange, userCallback)
    {
        if (majorChange && resource.type === WebInspector.resourceTypes.Stylesheet)
            resource.addRevision(content);

        if (this._styleSheetIdForResource(resource)) {
            this._innerSetContent(resource, content, majorChange, userCallback, null);
            return;
        }
        this._loadStyleSheetHeaders(this._innerSetContent.bind(this, resource, content, majorChange, userCallback));
    }
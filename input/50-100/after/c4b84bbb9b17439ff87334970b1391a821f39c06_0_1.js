function(resource, content, majorChange, userCallback)
    {
        var styleSource = /** @type {WebInspector.StyleSource} */ resource.uiSourceCode();
        if (!styleSource) {
            userCallback("Resource is not editable");
            return;
        }
        this.setStyleContent(styleSource, content, majorChange, userCallback);
    }
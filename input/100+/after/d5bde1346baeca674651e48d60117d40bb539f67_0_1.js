function(uiSourceCode, callback)
    {
        var scriptTreeElement = this._scriptTreeElementsByUISourceCode.get(uiSourceCode);
        if (!scriptTreeElement)
            return;

        // Tree outline should be marked as edited as well as the tree element to prevent search from starting.
        var treeOutlineElement = scriptTreeElement.treeOutline.element
        WebInspector.markBeingEdited(treeOutlineElement, true);

        function commitHandler(element, newTitle, oldTitle)
        {
            if (newTitle && newTitle !== oldTitle)
                this._fileRenamed(uiSourceCode, newTitle);
            else
                this._updateScriptTitle(uiSourceCode);
            afterEditing(true);
        }

        function cancelHandler()
        {
            afterEditing(false);
        }

        /**
         * @param {boolean} committed
         */
        function afterEditing(committed)
        {
            WebInspector.markBeingEdited(treeOutlineElement, false);
            if (callback)
                callback(committed);
        }

        var editingConfig = new WebInspector.EditingConfig(commitHandler.bind(this), cancelHandler.bind(this));
        this._updateScriptTitle(uiSourceCode, true);
        WebInspector.startEditing(scriptTreeElement.titleElement, editingConfig);
        window.getSelection().setBaseAndExtent(scriptTreeElement.titleElement, 0, scriptTreeElement.titleElement, 1);
    }
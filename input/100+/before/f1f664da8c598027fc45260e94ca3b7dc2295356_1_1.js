function(contextMenu, event)
    {
        var attribute = event.target.enclosingNodeOrSelfWithClass("webkit-html-attribute");
        var newAttribute = event.target.enclosingNodeOrSelfWithClass("add-attribute");

        // Add attribute-related actions.
        contextMenu.appendItem(WebInspector.UIString(WebInspector.useLowerCaseMenuTitles() ? "Add attribute" : "Add Attribute"), this._addNewAttribute.bind(this));
        if (attribute && !newAttribute)
            contextMenu.appendItem(WebInspector.UIString(WebInspector.useLowerCaseMenuTitles() ? "Edit attribute" : "Edit Attribute"), this._startEditingAttribute.bind(this, attribute, event.target));
        contextMenu.appendSeparator();
        if (this.treeOutline._setPseudoClassCallback) {
            var pseudoSubMenu = contextMenu.appendSubMenuItem(WebInspector.UIString(WebInspector.useLowerCaseMenuTitles() ? "Force element state" : "Force Element State"));
            this._populateForcedPseudoStateItems(pseudoSubMenu);
            contextMenu.appendSeparator();
        }

        this._populateNodeContextMenu(contextMenu);
        this.treeOutline._populateContextMenu(contextMenu, this.representedObject);
    }
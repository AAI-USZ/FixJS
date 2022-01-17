function(attribute, elementForSelection)
    {
        if (WebInspector.isBeingEdited(attribute))
            return true;

        var attributeNameElement = attribute.getElementsByClassName("webkit-html-attribute-name")[0];
        if (!attributeNameElement)
            return false;

        var attributeName = attributeNameElement.textContent;

        function removeZeroWidthSpaceRecursive(node)
        {
            if (node.nodeType === Node.TEXT_NODE) {
                node.nodeValue = node.nodeValue.replace(/\u200B/g, "");
                return;
            }

            if (node.nodeType !== Node.ELEMENT_NODE)
                return;

            for (var child = node.firstChild; child; child = child.nextSibling)
                removeZeroWidthSpaceRecursive(child);
        }

        // Remove zero-width spaces that were added by nodeTitleInfo.
        removeZeroWidthSpaceRecursive(attribute);

        var config = new WebInspector.EditingConfig(this._attributeEditingCommitted.bind(this), this._editingCancelled.bind(this), attributeName);
        
        function handleKeyDownEvents(event)
        {
            var isMetaOrCtrl = WebInspector.isMac() ?
                event.metaKey && !event.shiftKey && !event.ctrlKey && !event.altKey :
                event.ctrlKey && !event.shiftKey && !event.metaKey && !event.altKey;
            if (isEnterKey(event) && (event.isMetaOrCtrlForTest || !config.multiline || isMetaOrCtrl))
                return "commit";
            else if (event.keyCode === WebInspector.KeyboardShortcut.Keys.Esc.code || event.keyIdentifier === "U+001B")
                return "cancel";
            else if (event.keyIdentifier === "U+0009") // Tab key
                return "move-" + (event.shiftKey ? "backward" : "forward");
            else {
                WebInspector.handleElementValueModifications(event, attribute);
                return "";
            }
        }

        config.customFinishHandler = handleKeyDownEvents.bind(this);
        
        this._editing = WebInspector.startEditing(attribute, config);

        window.getSelection().setBaseAndExtent(elementForSelection, 0, elementForSelection, 1);

        return true;
    }
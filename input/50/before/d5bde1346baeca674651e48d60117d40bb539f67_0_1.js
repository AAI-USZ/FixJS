function afterEditing(committed)
        {
            WebInspector.markBeingEdited(scriptTreeElement.treeOutline.element, false);
            if (callback)
                callback(committed);
        }
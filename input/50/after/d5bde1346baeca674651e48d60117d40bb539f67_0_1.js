function afterEditing(committed)
        {
            WebInspector.markBeingEdited(treeOutlineElement, false);
            if (callback)
                callback(committed);
        }
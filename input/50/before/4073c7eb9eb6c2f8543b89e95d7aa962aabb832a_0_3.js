function (objSelf, sItemID, sItemName) {
        // Change the style of this item to reflect that a selection has been made
        $(objSelf).addClass("TreeItemNameSelected");
        
        // Call the callback function to handle the rest of the processing (so that the selection is visible in the tree when the user makes the
        // selection)
        window.setTimeout(function () { CallBack_OnClick_ItemSelected(objSelf, sItemID, sItemName) }, MIN_SETTIMOUT);
    }
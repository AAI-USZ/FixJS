function (objItem)
    {
        // Step up one parent at a time looking for the div with the class name 'TreeItemChildren'. Exit the loop if we found the node we're
        // looking for or if we ran out of parent nodes.
        var objParent = objItem.parentNode;
        while ((objParent != null) && (objParent.className !== "TreeItemChildren")) { objParent = objParent.parentNode; }
        return objParent;
    }
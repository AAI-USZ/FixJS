function (objItem)
    {
        // Step up one parent at a time looking for the div with the class name 'TreeItem' or 'TreeItemRoot'
        var objParent = objItem.parentNode;
        while (objParent !== null)
        {
            // If we've reached the top-most node in the tree then exit now
            if (objParent.id === m_sContainerID) { break; }

            // If we're not looking at a TreeItem or TreeItemRoot (same as a Tree item but at the root level - slightly different CSS attributes
            // are applied at the root) node then...
            if ((objParent.className !== "TreeItem") && (objParent.className !== "TreeItemRoot"))
            {
                // Grab a reference to the next parent node object
                objParent = objParent.parentNode;
            }
            else // We found a TreeItem/TreeItemRoot node...
            {
                break;
            } // End if ((objParent.className !== "TreeItem") && (objParent.className !== "TreeItemRoot"))
        } // End of the while (objParent !== null) loop

        // Return the parent object to the caller (might be null - caller should check for null before trying to use the object)
        return objParent;
    }
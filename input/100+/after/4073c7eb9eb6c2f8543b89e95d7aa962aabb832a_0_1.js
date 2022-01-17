function () {
            // Grab the element values that we need from the current Assignment node
            sAssignmentID = $(this).find("AssignmentID").text();
            sItemID = $(this).find("ItemID").text();
            sName = $(this).find("Name").text();
            sChildAssignmentsURI = $(this).find("GetAssignmentsURI").text();

            // Pull the Type from the AssignmentID value
            sType = sAssignmentID.substring(0, 1);

            // There are no children if there is no URI for the children. We also don't allow a tree item to be expanded past the Task level
            bHasChildren = !((sChildAssignmentsURI === "") || (sType === TYPE_TASK));


            // Build up the HTML needed for the current assignment row...
            //
            // - Root level assignment's will have the wrapper div with the class name 'TreeItemRoot'. The wrapper div's class name will simply 
            //   be 'TreeItem' for any other level down.
            //
            //   > There is a surrounding div for the Leaf, Type, and Name divs just so that when we're not dealing with a Task level item, 
            //     clicking anywhere on the row will trigger the expand/collapse of the row (rather than trying to hit a small target like the 
            //     leaf itself)
            //
            //     • The Leaf div's class name will either be 'TreeItemLeafCollapsed' (the [>] image) or 'TreeItemLeafNoChildren' (no image) 
            //       initially. When expanded, the leaf's class name will be 'TreeItemLeafExpanded' (the arrow poinging down a bit)
            //
            //     • The Item Type div will have one of the following class names: 'TreeItemTypeC', 'TreeItemTypeP', 'TreeItemTypeG', or
            //       'TreeItemTypeT' (Client, Project, Task Group, or Task respectively)
            //
            //     • The Name div will always contain the class name 'TreeItemName' but if we're dealing with a Task level assignment, the div
            //       will contain a second class name 'TreeItemNameSelectable'
            //
            //   > A div will be created the first time a branch is expaned that will hold the child assignment items of the current branch.
            //     While the content is being requested from the server-side code the div will have a class name of 'TreeItemChildrenLoading'. 
            //     Once the child assignments have been loaded, the class name will be changed to 'TreeItemChildren'
            //
            // We wrap our HTML string with $() to turn it into a jQuery object and then append the new jQuery object to parent object that was
            // passed into this function
            $(
                "<div class=\"TreeItem" + (bRootLevel ? "Root" : "") + "\" id=\"" + sAssignmentID + "-TreeItem\" data-itemname=\"" + EncodeTextForHTMLAttribute(sName) + "\">" +
                    "<div class=\"TreeItemLeafTypeNameContainer\" " + BuildItemLeafClickHandlerHTML(sAssignmentID, sType, sItemID, bHasChildren, sChildAssignmentsURI) + "data-leafexpanded=\"" + DB_FALSE + "\" data-childrenloaded=\"" + DB_FALSE + "\">" +
                        "<div class=\"TreeItemLeaf" + (bHasChildren ? "Collapsed" : "NoChildren") + "\" id=\"" + sAssignmentID + "-TreeItemLeaf\" />" +
                        "<div class=\"TreeItemType" + sType + "\"" + BuildItemSelectionHandlerHTML(sType, sItemID) + "/>" +
                        "<div class=\"TreeItemName" + (sType === TYPE_TASK ? " TreeItemNameSelectable" : "") + "\"" + BuildItemSelectionHandlerHTML(sType, sItemID) + "><p>" + EncodeTextForElement(sName) + "</p></div>" +
                    "</div>" +
                "</div>"
            ).appendTo(objDOMParent);
        }
function (objSelf, sSelfAssignmentID, sSelfType, sSelfItemID, sSelfName, sChildAssignmentsURI) {
        // Variables for values to be applied to objSelf (by default the values are set to so that we go to the expanded state)
        var sClassName = "TreeItemLeafExpanded";
        var sData_LeafExpanded = DB_TRUE;
        var sSelfChildrenID = (sSelfType + sSelfItemID + "-Children");
        var bExpandLeaf = true;
        var bLeafAlreadyExpanded = false;


        // If the current leaf is not yet expanded then...
        if (objSelf.getAttribute("data-leafexpanded") === DB_FALSE) {
            // If we have not yet loaded the children of this leaf then...
            if (objSelf.getAttribute("data-childrenloaded") === DB_FALSE) {
                // Flag that we have now loaded in the child data (so that we don't attempt to do so again) and that the leaf is expanded 
                // (objParent below is visible)
                objSelf.setAttribute("data-childrenloaded", DB_TRUE);
                bLeafAlreadyExpanded = true;

                // Create a div that will contain the child elements we're about to add. Turn the HTML into a jQuery object and append the new 
                // div as a child of the wrapper div that is being expanded.
                var $objParent = $("<div class=\"TreeItemChildrenLoading\" id=\"" + sSelfChildrenID + "\" data-itemname=\"" + sSelfName + "\"><img class=\"imgProcessing\" src=\"" + TRANSPARENT_GIF + "\" alt=\"Processing image\" /> Processing...</div>");
                $objParent.appendTo(objSelf.parentNode);

                // Request the child assignments to be loaded (pass the first item in the jQuery object, which is the DOM object itself, as the
                // 1st param)
                RequestAssignments($objParent[0], "AssignmentsGetAssignmentsForURI", sChildAssignmentsURI);
            } // End if(objSelf.getAttribute("data-childrenloaded") === DB_FALSE)
        }
        else // The leaf is currently expanded...
        {
            // Adjust the values to reflect that we are now collapsed
            sClassName = "TreeItemLeafCollapsed";
            sData_LeafExpanded = DB_FALSE;
            bExpandLeaf = false;
        } // End if (objSelf.getAttribute("data-leafexpanded") === DB_FALSE)


        // Get a reference to the child Leaf div. Remove the old class name and add on the new class name
        var $objLeaf = $(("#" + sSelfAssignmentID + "-TreeItemLeaf"));
        $objLeaf.removeClass((sClassName === "TreeItemLeafCollapsed" ? "TreeItemLeafExpanded" : "TreeItemLeafCollapsed"));
        $objLeaf.addClass(sClassName);

        // Adjust the data attribute of the current node to indicate if the leaf is expanded or not
        objSelf.setAttribute("data-leafexpanded", sData_LeafExpanded);


        // I want to give the user some feedback that they have successfully clicked on an item. We animate to a light blue and then animate
        // back to white.
        $(objSelf).animate({ "background-color": "#98bede" }, 100).animate({ "background-color": "#fff" }, 1000)


        // NOTE:    I was doing animations on the show/hide of branches too but it would mess up the scrolling of the div and occasionally bounce
        //          the user back to the top. As nice as the animations look, expected behaviour is better.        
        //
        // If we are to expand the branch and it is not already expanded then...
        if (bExpandLeaf && !bLeafAlreadyExpanded) {
            // Search the parent node of the current node for the Children div. Show the Children div
            $(("#" + sSelfChildrenID), objSelf.parentNode).show();
        }
        else if (!bExpandLeaf) // If we're to collapse the branch then...
        {
            // Search the parent node of the current node for the Children div. Hide the Children div
            $(("#" + sSelfChildrenID), objSelf.parentNode).hide();
        } // End if
    }
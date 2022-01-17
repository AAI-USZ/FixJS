function (objSelectedItem, objReturnInfo)
    {
        var sID = "", sType = "";
        var objItem = objSelectedItem;

        // Loop from the selected item up the tree to find the Project and Client nodes...
        while (true)
        {
            // Grab the next parent TreeItemChildren node and then grab the node's ID
            objItem = GetTreeItemChildrenParentNode(objItem)
            sID = objItem.id;

            // If we've reached the top-most node in the tree then exit now
            if (sID === m_sContainerID) { break; }

            // Grab the node's type. If we're looking at a Project node then...
            sType = sID.substring(0, 1);
            if (sType === TYPE_PROJECT)
            {
                // Remember the Project ID and Name
                //
                // The ID is in the form 'P99-Children'. We want the portion following the first character up to the '-' character (the '99').
                // Break the string into two at the '-' character and then grab everything but the leading 'P' charcter from the first array item
                // to get the project id.
                var arrID = sID.split('-');
                objReturnInfo.ProjectID = arrID[0].substring(1);
                objReturnInfo.ProjectName = objItem.getAttribute("data-itemname");
            }
            else if (sType === TYPE_CLIENT) // If we're looking at a Client node then...
            {
                // Remember the Client ID and Name. 
                //
                // The ID is in the form 'C101-Children'. We want the portion following the first character up to the '-' character (the '101').
                // Break the string into two at the '-' character and then grab everything but the leading 'C' charcter from the first array item
                // to get the client id.
                var arrID = sID.split('-');
                objReturnInfo.ClientID = arrID[0].substring(1);
                objReturnInfo.ClientName = objItem.getAttribute("data-itemname");

                // Exit the loop since we can't go any higher (clients are our top-level items)
                break;
            } // End if
        } // End of the while (true) loop.
    }
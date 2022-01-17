function (objSelectedItem, objReturnInfo)
    {
        var sID = "", sType = "";
        var objItem = objSelectedItem;

        // Loop from the selected item up the tree to find the Task, Project, and Client nodes...
        while (true)
        {
            // Get the next parent TreeItem/TreeItemRoot node and then grab the node's ID
            objItem = GetTreeItemParentNode(objItem);
            sID = objItem.id;

            // If we've reached the top-most node in the tree then exit now
            if (sID === m_sContainerID) { break; }

            // Grab the node's type. 
            sType = sID.substring(0, 1);
            if (sType === TYPE_TASK) // If we're looking at a Task node then...
            {
                // Remember the Task Name
                //
                // Note:    For Clients and Projects, the ID held here matches the item's ID. For Tasks (and Task Groups), however, the ID here 
                //          is the Assignment ID and NOT the Item ID. OnClick_ItemSelected is passed the Item ID so all that we're interested in
                //          at this point is getting the Task's name.
                objReturnInfo.TaskName = objItem.getAttribute("data-itemname");
            }
            else if (sType === TYPE_PROJECT) // If we're looking at a Project node then...
            {
                // Remember the Project ID and Name
                //
                // The ID is in the form 'P99-TreeItem'. We want the portion following the first character up to the '-' character (the '99').
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
                // The ID is in the form 'C101-TreeItem'. We want the portion following the first character up to the '-' character (the '101').
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
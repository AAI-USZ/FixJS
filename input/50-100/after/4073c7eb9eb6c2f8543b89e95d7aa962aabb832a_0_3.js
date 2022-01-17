function (objSelf, sItemID)
    {      
        // Create a JSON object to hold the Client, Project, and Task information for the selected item and then get the Client/Project information
        // associated with the current item
        var objSelectionInfo = { ClientID: "0", ClientName: "[None]", ProjectID: "", ProjectName: "", TaskID: sItemID, TaskName: "" };
        GetClientProjectAndTaskInfoForSelectedItem(objSelf, objSelectionInfo);

        // Pass the selection information to the following function (it will handle closing this dialog)
        m_fncOnItemSelected(objSelectionInfo);


        // We don't care about a success return value in this case so just call the function and continue on (server keeps track of the selected
        // assignment items so that all apps that use the core can stay in sync. allows us to reselect the last selected Client/Project/Task the 
        // next time the app is opened. will also give us the ability to display an MRU list for quick selection of a recently selected 
        // assignment item)
        $.post(SERVERMETHOD_ASHX, GetDataObjectForUpdateAssignmentMRU(objSelectionInfo));

        // Remove our item selection so that it doesn't show up selected the next time the user displays this form (everything will still be
        // expanded but at least they won't see multiple selected items from prevous selections). We use a timeout to 
        window.setTimeout(function () { $(objSelf).removeClass("TreeItemNameSelected") }, MIN_SETTIMOUT);
    }
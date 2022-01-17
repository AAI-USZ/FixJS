function (sType, sItemID, sName)
    {
        // If we are not dealing with a task-level assignment then return now (only task-level items should be selectable)
        if (sType !== TYPE_TASK) { return ""; }

        // Build the OnClick event handler that will be called when this item is selected
        return (" onclick=\"javascript:" + m_sClassInstanceName + ".OnClick_ItemSelected(this,'" + sItemID + "','" + sName + "');\" ");
    }
function (sAssignmentID, sType, sItemID, sName, bHasChildren, sChildAssignmentsURI)
    {
        // If the tree item has no children then it should not get a click event handler to expand/collapse the item
        if (!bHasChildren) { return ""; }

        // Build the OnClick event handler to have the current item expand/collapse (g_AssignmentTree is this class instance in frm_timer.js)
        return (" onclick=\"javascript:" + m_sClassInstanceName + ".OnClick_ItemLeaf(this,'" + sAssignmentID + "','" + sType + "','" + sItemID + "','" + sName + "','" + sChildAssignmentsURI + "');\" ");
    }
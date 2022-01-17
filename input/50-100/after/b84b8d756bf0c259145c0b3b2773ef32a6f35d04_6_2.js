function (groupName) {
        cc.Assert(groupName != null && groupName.length > 0, "Invalid group name!");
        if (this._objectGroups) {
            for (var i = 0; i < this._objectGroups.length; i++) {
                var objectGroup = this._objectGroups[i];
                if (objectGroup && objectGroup.getGroupName() == groupName) {
                    return objectGroup;
                }
            }
        }
        // objectGroup not found
        return null;
    }
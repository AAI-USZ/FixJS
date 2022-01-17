function() {
        var selectedUsers = this._getSelectedUsers();
        if(this.confirmBeforeRemove) {
            this._confirmRemove(selectedUsers);
        } else {
            this.removeUsers(selectedUsers);
        }
    }
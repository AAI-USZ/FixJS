function(userRecord) {
        this._hightlightUser(userRecord);
        this.fireEvent('usersAdded', [userRecord]);
    }
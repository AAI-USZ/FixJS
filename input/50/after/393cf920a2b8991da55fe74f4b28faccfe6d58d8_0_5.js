function(userRecords) {
        this.removeSaveMask();
        this.fireEvent('usersRemoved', [userRecords]);
    }
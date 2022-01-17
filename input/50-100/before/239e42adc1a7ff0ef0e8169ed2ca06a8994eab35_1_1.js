function() {
        // Summary:
        //   Custom setWidgets for calendar
        this.userStore.fetch(
            dojo.hitch(this, function() {
                if (this.getActiveUser() === null) {
                    this.setActiveUser(this._getCurrentUser());
                }
                this.loadAppropriateList();
            }));
    }
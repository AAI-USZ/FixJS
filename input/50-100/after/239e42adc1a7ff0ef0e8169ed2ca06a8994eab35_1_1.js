function() {
        // Summary:
        //   Custom setWidgets for calendar
        phpr.userStore.fetch(
            dojo.hitch(this, function() {
                if (this.getActiveUser() === null) {
                    this.setActiveUser(this._getCurrentUser());
                }
                this.loadAppropriateList();
            }));
    }
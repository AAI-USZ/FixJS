function() {
        // Summary:
        //    First function of the user selection window process, for the group view.
        // Description:
        //    Request the user list to the DB and then calls the next function of the process to show the selection
        // window.
        this._usersSelectionMode = true;
        var newstate = dojo.clone(this.state);
        newstate.action = "dayListSelect";
        phpr.pageManager.changeState(newstate, {noAction: true});
        this.userStore = new phpr.Default.System.Store.User();
        this.userStore.fetch(dojo.hitch(this, "selectorRender"));
    }
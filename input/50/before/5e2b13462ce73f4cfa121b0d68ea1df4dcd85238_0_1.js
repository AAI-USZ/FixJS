function() {
        let index = this._getWorkspaceLeft();
        if (index != global.screen.get_active_workspace_index()) {
            global.screen.get_workspace_by_index(index).activate(global.get_current_time()); 
        }       
    }
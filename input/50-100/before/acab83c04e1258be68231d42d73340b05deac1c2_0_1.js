function (){
        if (global.screen.n_workspaces <= 1)
            return false;
        this.emit('remove-event');
        Main._removeWorkspace(this.metaWorkspace);
        this.removed = true;
        return true;
    }
function (){
        if (this._doomed) {
            // this workspace is already being removed
            return;
        }
        if (global.screen.n_workspaces <= 1) {
            return;
        }
        this._doomed = true;
        this.emit('remove-event');
        Main._removeWorkspace(this.metaWorkspace);
        this.removed = true;
        return true;
    }
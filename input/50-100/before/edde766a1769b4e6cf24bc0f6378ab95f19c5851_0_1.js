function() {
        this.disconnectTrackedSignals(this._wsSignals);
 		for ( let i=0; i < global.screen.n_workspaces; ++i ) {
             let ws = global.screen.get_workspace_by_index(i);
             this.connectAndTrack(this._wsSignals, ws, 'window-removed',
                     Lang.bind(this, this._windowRemoved));
         }
 	}
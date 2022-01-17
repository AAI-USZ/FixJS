function(source, actor, x, y, time) {
        if (this.state > ThumbnailState.NORMAL)
            return false;
        this.metaWorkspace.activate(time);
        if (source.realWindow) {
            let win = source.realWindow;
            if (this._isMyWindow(win))
                return false;

            let metaWindow = win.get_meta_window();

            // We need to move the window before changing the workspace, because
            // the move itself could cause a workspace change if the window enters
            // the primary monitor
            if (metaWindow.get_monitor() != this.monitorIndex)
                metaWindow.move_to_monitor(this.monitorIndex);

            metaWindow.change_workspace_by_index(this.metaWorkspace.index(),
                                                 false, // don't create workspace
                                                 time);


            this._overviewModeOn();
            return true;
        }
        return false;
    }
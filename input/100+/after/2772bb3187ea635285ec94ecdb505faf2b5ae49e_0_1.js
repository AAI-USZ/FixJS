function(source, actor, x, y, time) {
        if (this.handleDragOver(source, actor, x, y, time) === DND.DragMotionResult.CONTINUE) {
            return false;
        }

        this.metaWorkspace.activate(time);
        let win = source.realWindow;
        let metaWindow = win.get_meta_window();

        // We need to move the window before changing the workspace, because
        // the move itself could cause a workspace change if the window enters
        // the primary monitor
        if (metaWindow.get_monitor() != this.monitorIndex) {
            metaWindow.move_to_monitor(this.monitorIndex);
        }

        metaWindow.change_workspace_by_index(this.metaWorkspace.index(),
                                                false, // don't create workspace
                                                time);

        this._overviewModeOn();
        return true;
    }
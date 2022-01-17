function(direction) {
        let activeWorkspace = global.screen.get_active_workspace();
        let toActivate = activeWorkspace.get_neighbor(direction);

        if (activeWorkspace != toActivate)
            toActivate.activate(global.get_current_time());
        if (!Main.overview.visible)
            this._workspaceSwitcherPopup.display(direction, toActivate.index());
    }
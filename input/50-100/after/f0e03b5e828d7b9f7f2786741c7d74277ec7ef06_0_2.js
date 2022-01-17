function(direction) {
        let activeWorkspace = global.screen.get_active_workspace();
        let toActivate = activeWorkspace.get_neighbor(direction);

        if (activeWorkspace != toActivate)
            toActivate.activate(global.get_current_time());

        return toActivate;
    }
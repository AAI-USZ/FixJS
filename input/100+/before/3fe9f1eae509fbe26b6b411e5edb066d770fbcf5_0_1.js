function() {
        let rtl = (St.Widget.get_default_direction() == St.TextDirection.RTL);
        let activeWorkspaceIndex = global.screen.get_active_workspace_index();
        let indexToActivate = activeWorkspaceIndex;
        if (rtl && activeWorkspaceIndex < global.screen.n_workspaces - 1)
            indexToActivate++;
        else if (!rtl && activeWorkspaceIndex > 0)
            indexToActivate--;
        else if (rtl && activeWorkspaceIndex == global.screen.n_workspaces - 1)
            indexToActivate = 0;
        else if (!rtl && activeWorkspaceIndex == 0)
            indexToActivate = global.screen.n_workspaces - 1;

        if (indexToActivate != activeWorkspaceIndex)
            global.screen.get_workspace_by_index(indexToActivate).activate(global.get_current_time());        
    }
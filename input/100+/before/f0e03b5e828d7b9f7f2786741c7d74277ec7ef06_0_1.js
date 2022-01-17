function(display, screen, window, binding) {
        if (screen.n_workspaces == 1)
            return;

        if (this._workspaceSwitcherPopup == null)
            this._workspaceSwitcherPopup = new WorkspaceSwitcherPopup.WorkspaceSwitcherPopup();

        let [action,,,direction] = binding.get_name().split('-');
        let direction = Meta.MotionDirection[direction.toUpperCase()];

        if (direction != Meta.MotionDirection.UP &&
            direction != Meta.MotionDirection.DOWN)
            return;

        if (action == 'switch')
            this.actionMoveWorkspace(direction);
        else
            this.actionMoveWindow(window, direction);
    }
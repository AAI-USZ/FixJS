function(actor, event) {
        let modifiers = Cinnamon.get_event_state(event);
        let symbol = event.get_key_symbol();
        if (symbol === Clutter.Return || symbol === Clutter.KEY_space 
            || symbol === Clutter.KP_Enter)
        {
            this.activateSelectedWorkspace();
            return true;
        }
        if ((symbol === Clutter.Delete && (modifiers & Clutter.ModifierType.MODIFIER_MASK) === 0)
            || symbol === Clutter.w && modifiers & Clutter.ModifierType.CONTROL_MASK) {
            this.removeSelectedWorkspace();
            return true;
        }
        if (symbol === Clutter.F2) {
            this.editWorkspaceTitle();
            return true;
        }
        return this.selectNextWorkspace(symbol);
    }
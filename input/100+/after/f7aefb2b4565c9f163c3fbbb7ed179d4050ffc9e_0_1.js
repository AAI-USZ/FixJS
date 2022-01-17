function(actor, event) {
        let modifiers = Cinnamon.get_event_state(event);
        let ctrlAltMask = Clutter.ModifierType.CONTROL_MASK | Clutter.ModifierType.MOD1_MASK;
        let symbol = event.get_key_symbol();
        if (symbol === Clutter.Return || symbol === Clutter.KEY_space 
            || symbol === Clutter.KP_Enter)
        {
            this.activateSelectedWorkspace();
            return true;
        }
        if ((symbol === Clutter.Delete && (modifiers & ctrlAltMask) !== ctrlAltMask)
            || symbol === Clutter.w && modifiers & Clutter.ModifierType.CONTROL_MASK)
        {
            this.removeSelectedWorkspace();
            return true;
        }
        if (symbol === Clutter.F2) {
            this.editWorkspaceTitle();
            return true;
        }
        return this.selectNextWorkspace(symbol);
    }
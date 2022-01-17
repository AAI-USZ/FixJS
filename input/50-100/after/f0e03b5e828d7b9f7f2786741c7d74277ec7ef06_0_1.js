function(display, screen, window, binding) {
        /* prevent a corner case where both popups show up at once */
        if (this._workspaceSwitcherPopup != null)
            this._workspaceSwitcherPopup.destroy();

        let tabPopup = new AltTab.AltTabPopup();

        let modifiers = binding.get_modifiers();
        let backwards = modifiers & Meta.VirtualModifier.SHIFT_MASK;
        if (!tabPopup.show(backwards, binding.get_name(), binding.get_mask()))
            tabPopup.destroy();
    }
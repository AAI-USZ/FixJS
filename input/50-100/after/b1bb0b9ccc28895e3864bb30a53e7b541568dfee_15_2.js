function(e) {
        if (this.session.multiSelect.inVirtualMode)
            return;
        this.inMultiSelectMode = false;

        this.unsetStyle("multiselect");
        this.keyBinding.removeKeyboardHandler(commands.keyboardHandler);

        this.commands.removeEventListener("exec", this.$onMultiSelectExec);
        this.renderer.updateCursor();
        this.renderer.updateBackMarkers();
    }
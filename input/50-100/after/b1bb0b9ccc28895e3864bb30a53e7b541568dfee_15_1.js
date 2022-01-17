function(e) {
        if (this.inMultiSelectMode)
            return;
        this.inMultiSelectMode = true;

        this.setStyle("multiselect");
        this.keyBinding.addKeyboardHandler(commands.keyboardHandler);
        this.commands.on("exec", this.$onMultiSelectExec);

        this.renderer.updateCursor();
        this.renderer.updateBackMarkers();
    }
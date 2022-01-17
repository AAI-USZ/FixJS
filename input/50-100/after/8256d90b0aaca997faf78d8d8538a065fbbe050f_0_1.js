function(force) {
        if (!force && this.options.promptOnCancel && this._dirty) {
            if (confirm("You have unsaved changes. Are you " +
                        "sure you want to discard them?")) {
                this.cancel(true);
            }

            return;
        }

        this.hideEditor();
        this.element.triggerHandler("cancel", [this._initialValue]);
    }
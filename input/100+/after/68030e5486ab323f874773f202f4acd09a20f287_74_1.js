f        var primaryBtn = this.find(".primary"),
            buttonId = null,
            which = String.fromCharCode(e.which);
        
        if (e.which === 13) {
            // Click primary button
            if (primaryBtn) {
                buttonId = primaryBtn.attr("data-button-id");
            }
        } else if (e.which === 32) {
            // Space bar on focused button
            this.find(".dialog-button:focus").click();
        } else if (brackets.platform === "mac") {
            // CMD+D Don't Save
            if (e.metaKey && (which === "D")) {
                if (_hasButton(this, DIALOG_BTN_DONTSAVE)) {
                    buttonId = DIALOG_BTN_DONTSAVE;
                }
            // FIXME (issue #418) CMD+. Cancel swallowed by native shell
            } else if (e.metaKey && (e.which === 190)) {
                buttonId = DIALOG_BTN_CANCEL;
            }
        } else { // if (brackets.platform === "win") {
            // 'N' Don't Save
            if (which === "N") {
                if (_hasButton(this, DIALOG_BTN_DONTSAVE)) {
                    buttonId = DIALOG_BTN_DONTSAVE;
                }
            }
        }
        
        if (buttonId) {
            _dismissDialog(this, buttonId);
        } else if (!($.contains(this.get(0), e.target)) ||
                  (this.filter(":input").length === 0)) {
            // Stop the event if the target is not inside the dialog
            // or if the target is not a form element.
            // TODO (issue #414): more robust handling of dialog scoped
            //                    vs. global key bindings
            e.stopPropagation();
            e.preventDefault();
        }
    };

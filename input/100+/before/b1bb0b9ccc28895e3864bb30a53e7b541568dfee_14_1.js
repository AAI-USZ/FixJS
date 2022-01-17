function(ev) {
        this.mousedownEvent = ev;
        var inSelection = ev.inSelection();
        var pos = ev.getDocumentPosition();
        var editor = this.editor;
        var _self = this;

        var button = ev.getButton();
        if (button !== 0) {
            var selectionRange = editor.getSelectionRange();
            var selectionEmpty = selectionRange.isEmpty();

            if (selectionEmpty) {
                editor.moveCursorToPosition(pos);
                editor.selection.clearSelection();
            }

            // 2: contextmenu, 1: linux paste
            editor.textInput.onContextMenu(ev.domEvent);
            return ev.stop();
        }

        // if this click caused the editor to be focused should not clear the
        // selection
        if (inSelection && !editor.isFocused()) {
            editor.focus();
            return;
        }

        if (!inSelection || this.$clickSelection || ev.getShiftKey()) {
            // Directly pick STATE_SELECT, since the user is not clicking inside
            // a selection.
            this.startSelect(pos);
        } else if (inSelection) {
            var e = ev.domEvent;
            if ((e.ctrlKey || e.altKey)) {
                this.startDrag();
            } else {
                this.mousedownEvent.time = (new Date()).getTime();
                this.setState("dragWait");
            }
        }

        this.captureMouse(ev)
    }
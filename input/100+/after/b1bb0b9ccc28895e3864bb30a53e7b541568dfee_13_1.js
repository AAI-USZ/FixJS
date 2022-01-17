function(e) {
        var target = e.domEvent.target;
        if (target.className.indexOf("ace_gutter-cell") == -1)
            return;

        if (!editor.isFocused())
            return;

        var padding = parseInt(dom.computedStyle(target).paddingLeft);
        if (e.x < padding + target.getBoundingClientRect().left + 1)
            return;

        var row = e.getDocumentPosition().row;
        var selection = editor.session.selection;

        if (e.getShiftKey()) {
            selection.selectTo(row, 0);
        } else {
            selection.moveCursorTo(row, 0);
            selection.selectLine();
            mouseHandler.$clickSelection = selection.getRange();
        }

        mouseHandler.captureMouse(e, "selectByLines");
        return e.preventDefault();
    }
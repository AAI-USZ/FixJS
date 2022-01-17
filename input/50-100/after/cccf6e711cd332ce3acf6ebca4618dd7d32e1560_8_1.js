function(event) {
        var message = event.data.message;
        var pos = event.data.pos;
        var cursorPos = ceEditor.$editor.getCursorPosition();
        var displayPos = event.data.displayPos || cursorPos;
        if(cursorPos.column === pos.column && cursorPos.row === pos.row && message)
            tooltip.show(displayPos.row, displayPos.column, message);
        else
            tooltip.hide();
    }
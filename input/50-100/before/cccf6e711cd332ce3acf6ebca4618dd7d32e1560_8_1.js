function(event) {
        var message = event.data.message;
        var pos = event.data.pos;
        var cursorPos = ceEditor.$editor.getCursorPosition();
        if(cursorPos.column === pos.column && cursorPos.row === pos.row && message)
            tooltip.show(cursorPos.row, cursorPos.column, message);
        else
            tooltip.hide();
    }
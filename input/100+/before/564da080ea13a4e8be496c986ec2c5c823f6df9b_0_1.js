function (editor, event) {
        // This method gets called in CodeMirror's onKeyDown/onKeyPress
        // handlers and is used to provide custom key handling. Its return
        // value is used to determine if CodeMirror should ignore the event:
        // true = ignore, false = don't ignore.

        if (this.read_only){
            return false;
        }

        var that = this;
        // whatever key is pressed, first, cancel the tooltip request before
        // they are sent, and remove tooltip if any, except for tab again
        if (event.type === 'keydown' && event.which != key.TAB ) {
            IPython.tooltip.remove_and_cancel_tooltip();
        };

        var cur = editor.getCursor();

        if (event.keyCode === key.ENTER && (event.shiftKey || event.ctrlKey)) {
            // Always ignore shift-enter in CodeMirror as we handle it.
            return true;
        } else if (event.which === 40 && event.type === 'keypress' && IPython.tooltip.time_before_tooltip >= 0) {
            // triger on keypress (!) otherwise inconsistent event.which depending on plateform
            // browser and keyboard layout !
            // Pressing '(' , request tooltip, don't forget to reappend it
            IPython.tooltip.pending(that);
        } else if (event.which === key.UPARROW && event.type === 'keydown') {
            // If we are not at the top, let CM handle the up arrow and
            // prevent the global keydown handler from handling it.
            if (!that.at_top()) {
                event.stop();
                return false;
            } else {
                return true;
            };
        } else if (event.which === key.ESC) {
            IPython.tooltip.remove_and_cancel_tooltip(true);
            return true;
        } else if (event.which === key.DOWNARROW && event.type === 'keydown') {
            // If we are not at the bottom, let CM handle the down arrow and
            // prevent the global keydown handler from handling it.
            if (!that.at_bottom()) {
                event.stop();
                return false;
            } else {
                return true;
            };
        } else if (event.keyCode === key.TAB && event.type == 'keydown') {
            // Tab completion.
            //Do not trim here because of tooltip
            var pre_cursor = editor.getRange({line:cur.line,ch:0},cur);
            if (pre_cursor.trim() === "") {
                // Don't autocomplete if the part of the line before the cursor
                // is empty.  In this case, let CodeMirror handle indentation.
                return false;
            } else if ((pre_cursor.substr(-1) === "("|| pre_cursor.substr(-1) === " ") && that.tooltip_on_tab ) {
                IPython.tooltip.request(that);
                // Prevent the event from bubbling up.
                event.stop();
                // Prevent CodeMirror from handling the tab.
                return true;
            } else {
                event.stop();
                this.completer.startCompletion();
                return true;
            };
        } else if (event.keyCode === key.BACKSPACE && event.type == 'keydown') {
            // If backspace and the cursor in the region of the spaces of the tail of a line, delete all spaces
            var cur = editor.getCursor();
            var line = editor.getLine(cur.line);
            if (line[cur.ch - 1] != " ") { //avoid regular expression match when the character before the cursor is not space
                return false;
            }
            var tail_space = line.match(/ +$/g)
            if (tail_space) { 
                var pre_indent_point = Math.floor( (cur.ch - 1)/ 4 ) * 4 + 1;
                if (pre_indent_point > line.length - tail_space[0].length ) {
                    //There are more than 4 spaces, delete up to previous indent point
                    editor.replaceRange('',
                        {line: cur.line, ch: pre_indent_point},
                        {line: cur.line, ch: line.length}
                    );
                } else {
                    //Less than 4 spaces, delete them all
                    editor.replaceRange('',
                        {line: cur.line, ch: line.length - tail_space[0].length},
                        {line: cur.line, ch: line.length}
                    );
                    event.stop();
                    return true;
                }
            } else {
                return false;
            };
        } else {
            // keypress/keyup also trigger on TAB press, and we don't want to
            // use those to disable tab completion.
            return false;
        };
        return false;
    }
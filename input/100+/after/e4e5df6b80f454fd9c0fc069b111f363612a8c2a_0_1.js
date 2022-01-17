function handleEditorMouseDown(editor, event) {
        // Drag state
        var scrubState; // instance of one of the *Scrub classes
        var downX;      // mousedown pageX
        var lastValue;  // last value from scrubState.update()
        var lastRange;  // text range of lastValue in the code
        
        function delta(event) {
            var pxDelta = event.pageX - downX;
            return (pxDelta / 8) | 0;   // "| 0" truncates to int
        }
        
        function moveHandler(event) {
            var newVal = scrubState.update(delta(event));
            
            if (newVal !== lastValue) {
                lastValue = newVal;
                editor._codeMirror.replaceRange(newVal, lastRange.start, lastRange.end);
                lastRange.end.ch = lastRange.start.ch + newVal.length;
//                editor.setSelection(lastRange.start, lastRange.end);
            }
        }
        function upHandler(event) {
            $(window.document).off("mousemove", moveHandler);
            $(window.document).off("mouseup", upHandler);
        }
        
        //  coordsChar() returns the closest insertion point, not always char the click was ON.
        //  -------------------
        //  |     I* X  |     |     * = mousedn
        //  -------------------     X = coordsChar().ch, interpreted as a char pos
        //  |     |    *I  X  |     I = coordsChar().ch, interpreted as a cursor pos / insertion point
        //  -------------------
        var pos = editor._codeMirror.coordsChar({x: event.pageX, y: event.pageY});
        var chLeftEdge = editor._codeMirror.charCoords(pos).x;
        var mousedownCh = (chLeftEdge <= event.pageX) ? pos.ch : pos.ch - 1;
        
        // ch+1 because getTokenAt() returns the token *ending* at cursor pos 'ch' (char at 'ch' is NOT part of the token)
        var token = editor._codeMirror.getTokenAt({line: pos.line, ch: mousedownCh + 1});
        
        // Is this token a value we can scrub? Init value-specific state if so
        scrubState = parseForScrub(token);
        
        if (scrubState) {
            event.stopPropagation();
            event.preventDefault();
            
            downX = event.pageX;
            
            lastValue = token.string;
            lastRange = {start: {line: pos.line, ch: token.start}, end: {line: pos.line, ch: token.end}};
            $(window.document).mousemove(moveHandler);
            $(window.document).mouseup(upHandler);
            
//            editor.setSelection(lastRange.start, lastRange.end);
            editor.setCursorPos(lastRange.start.line, lastRange.end.ch);
        }
    }
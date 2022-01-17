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
        
        var pos = editor._codeMirror.coordsChar({x: event.pageX, y: event.pageY});
        var token = editor._codeMirror.getTokenAt(pos);
        
        if (Color3Scrub.matches(token)) {
            scrubState = new Color3Scrub(token.string);
        } else if (Color6Scrub.matches(token)) {
            scrubState = new Color6Scrub(token.string);
        } else if (SimpleNumberScrub.matches(token)) {
            scrubState = new SimpleNumberScrub(token.string);
        } else {
            scrubState = null;
        }
        
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
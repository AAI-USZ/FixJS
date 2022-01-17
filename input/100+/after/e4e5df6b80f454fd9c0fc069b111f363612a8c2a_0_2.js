function (require, exports, module) {
    'use strict';
    
    // Brackets modules
    var EditorManager    = brackets.getModule("editor/EditorManager"),
        InlineTextEditor = brackets.getModule("editor/InlineTextEditor").InlineTextEditor;
    
    
    var isMac = (brackets.platform === "mac");
    
    // Utilities
    function clip(val, max) {
        return (val < 0 ? 0 : (val > max ? max : val));
    }
    
    
    // Scrubbing a single number (with optional suffix)
    function SimpleNumberScrub(string) {
        // Support numbers with a suffix like "px" or "%"
        var extras = /(-?[\d\.]+)([^\d\-\.]*)/.exec(string);
        var origStringValue = (extras && extras[1]) || string;
        this.suffix = (extras && extras[2]) || "";
        
        this.origValue = parseFloat(origStringValue);
        
        // Increment slower for numbers with decimal (even if it's ".0")
        this.increment = (origStringValue.indexOf(".") === -1) ? 1 : 0.1;
    }
    SimpleNumberScrub.matches = function (token) {
        // CodeMirror marks all sorts of CSS tokens as "number", including enums like "auto" and segments of URL paths
        return token.className === "number" && !isNaN(parseFloat(token.string));
    };
    SimpleNumberScrub.prototype.update = function (delta) {
        var newVal = this.origValue + (delta * this.increment);
        if (this.increment < 1) {
            newVal = Math.round(newVal * 10) / 10;  // prevent rounding errors from adding extra decimals
        }
        
        var str = String(newVal);
        if (this.increment < 1 && str.indexOf(".") === -1) {
            str += ".0";    // don't jitter to a shorter length when passing a whole number
        }
        return str + this.suffix;
    };
    
    // Scrubbing 3-digit hex color
    function Color3Scrub(string) {
        this.r = parseInt(string[1], 16);
        this.g = parseInt(string[2], 16);
        this.b = parseInt(string[3], 16);
    }
    Color3Scrub.matches = function (token) {
        return token.className === "atom" && token.string.match(/#[0-9a-f]{3}$/i);
    };
    Color3Scrub.prototype.update = function (delta) {
        var r = clip(this.r + delta, 15);
        var g = clip(this.g + delta, 15);
        var b = clip(this.b + delta, 15);
        return "#" + r.toString(16) + g.toString(16) + b.toString(16);
    };
    
    // Scrubbing 6-digit hex color
    function Color6Scrub(string) {
        this.r = parseInt(string[1] + string[2], 16);
        this.g = parseInt(string[3] + string[4], 16);
        this.b = parseInt(string[5] + string[6], 16);
    }
    Color6Scrub.matches = function (token) {
        return token.className === "atom" && token.string.match(/#[0-9a-f]{6}$/i);
    };
    Color6Scrub.prototype.update = function (delta) {
        function force2Digits(str) {
            if (str.length === 1) {
                str = "0" + str;
            }
            return str;
        }
        var r = clip(this.r + delta, 255);
        var g = clip(this.g + delta, 255);
        var b = clip(this.b + delta, 255);
        return "#" + force2Digits(r.toString(16)) + force2Digits(g.toString(16)) + force2Digits(b.toString(16));
    };
    
    function parseForScrub(token) {
        if (Color3Scrub.matches(token)) {
            return new Color3Scrub(token.string);
        } else if (Color6Scrub.matches(token)) {
            return new Color6Scrub(token.string);
        } else if (SimpleNumberScrub.matches(token)) {
            return new SimpleNumberScrub(token.string);
        }
        return null;
    }

    
    /** Main scrubbing event handling. Detects number format, adds global move/up listeners, detaches when done */
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
    
    
    /** Finds innermost editor containing the given element */
    function editorFromElement(element) {
        var result;
        var fullEditor = EditorManager.getCurrentFullEditor();
        if (fullEditor) {
            fullEditor.getInlineWidgets().forEach(function (widget) {
                if (widget.htmlContent.contains(element)) {
                    if (widget instanceof InlineTextEditor) {
                        widget.editors.forEach(function (editor) {
                            if (editor.getRootElement().contains(element)) {
                                result = editor;
                            }
                        });
                    } else {
                        // Ignore mousedown on inline widgets other than editors
                        result = null;
                    }
                }
            });
            
            if (result !== undefined) {
                return result;
            } else {
                return fullEditor;
            }
        }
        return null;
    }
    
    function handleMouseDown(event) {
        // We only care about ctrl+drag on Win, cmd+drag on Mac
        if (event.which === 1 && ((isMac && event.metaKey) || (!isMac && event.ctrlKey))) {
            // Which editor did mousedown occur on (inline vs. full-size vs. no editor open)
            var editor = editorFromElement(event.target);
            if (editor) {
                handleEditorMouseDown(editor, event);
            }
        }
    }
    
    
    // Init: listen to all mousedowns in the editor area
    $("#editor-holder")[0].addEventListener("mousedown", handleMouseDown, true);
}
function (require, exports, module) {
    'use strict';
    
    // Load dependent modules
    var Commands           = require("command/Commands"),
        CommandManager     = require("command/CommandManager"),
        EditorManager      = require("editor/EditorManager");
    
    
    /**
     * Add or remove line-comment tokens to all the lines in the selected range, preserving selection
     * and cursor position. Applies to currently focused Editor.
     * 
     * If all non-whitespace lines are already commented out, then we uncomment; otherwise we comment
     * out. Commenting out adds "//" to at column 0 of every line. Uncommenting removes the first "//"
     * on each line (if any - empty lines might not have one).
     */
    function lineCommentSlashSlash(editor) {
        
        var sel = editor.getSelection();
        var startLine = sel.start.line;
        var endLine = sel.end.line;
        
        // Is a range of text selected? (vs just an insertion pt)
        var hasSelection = (startLine !== endLine) || (sel.start.ch !== sel.end.ch);
        
        // In full-line selection, cursor pos is start of next line - but don't want to modify that line
        if (sel.end.ch === 0 && hasSelection) {
            endLine--;
        }
        
        // Decide if we're commenting vs. un-commenting
        // Are there any non-blank lines that aren't commented out? (We ignore blank lines because
        // some editors like Sublime don't comment them out)
        var containsUncommented = false;
        var i;
        var line;
        for (i = startLine; i <= endLine; i++) {
            line = editor.getLineText(i);
            // A line is commented out if it starts with 0-N whitespace chars, then "//"
            if (!line.match(/^\s*\/\//) && line.match(/\S/)) {
                containsUncommented = true;
                break;
            }
        }
        
        // Make the edit
        var doc = editor.document;
        doc.batchOperation(function () {
            
            if (containsUncommented) {
                // Comment out - prepend "//" to each line
                for (i = startLine; i <= endLine; i++) {
                    doc.replaceRange("//", {line: i, ch: 0});
                }
                
                // Make sure selection includes "//" that was added at start of range
                if (sel.start.ch === 0 && hasSelection) {
                    // use *current* selection end, which has been updated for our text insertions
                    editor.setSelection({line: startLine, ch: 0}, editor.getSelection().end);
                }
                
            } else {
                // Uncomment - remove first "//" on each line (if any)
                for (i = startLine; i <= endLine; i++) {
                    line = editor.getLineText(i);
                    var commentI = line.indexOf("//");
                    if (commentI !== -1) {
                        doc.replaceRange("", {line: i, ch: commentI}, {line: i, ch: commentI + 2});
                    }
                }
            }
        });
        
    }

    /**
     * Invokes a language-specific line-comment/uncomment handler
     * @param {?Editor} editor If unspecified, applies to the currently focused editor
     */
    function lineComment(editor) {
        editor = editor || EditorManager.getFocusedEditor();
        if (!editor) {
            return;
        }
        
        // TODO: use mode *at cursor location*, so we can support mixed-mode e.g. JS in script blocks
        var mode = editor._codeMirror.getOption("mode");
        
        // Currently we only support languages with "//" commenting
        if (mode === "javascript" || mode === "less") {
            lineCommentSlashSlash(editor);
        }
    }
    
    
    /**
     * Duplicates the selected text, or current line if no selection. The cursor/selection is left
     * on the second copy.
     */
    function duplicateText(editor) {
        editor = editor || EditorManager.getFocusedEditor();
        if (!editor) {
            return;
        }
        
        var sel = editor.getSelection();
        
        var hasSelection = (sel.start.line !== sel.end.line) || (sel.start.ch !== sel.end.ch);
        
        if (!hasSelection) {
            sel.start.ch = 0;
            sel.end = {line: sel.start.line + 1, ch: 0};
        }
        
        // Make the edit
        var doc = editor.document;
        
        var selectedText = doc.getRange(sel.start, sel.end);
        doc.replaceRange(selectedText, sel.start);
    }
    
    
    // Register commands
    CommandManager.register(Commands.EDIT_LINE_COMMENT, lineComment);
    CommandManager.register(Commands.EDIT_DUPLICATE, duplicateText);
}
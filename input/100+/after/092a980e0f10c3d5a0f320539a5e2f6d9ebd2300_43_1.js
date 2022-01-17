function (require, exports, module) {
    "use strict";
    
    // Brackets modules
    var EditorManager           = brackets.getModule("editor/EditorManager"),
        ProjectManager          = brackets.getModule("project/ProjectManager");
    
    // Local modules
    var InlineImageViewer       = require("InlineImageViewer");
    
    /**
     * Return the token string that is at the specified position.
     *
     * @param hostEditor {!Editor} editor
     * @param {!{line:Number, ch:Number}} pos
     * @return {String} token string at the specified position
     */
    function _getStringAtPos(hostEditor, pos) {
        var token = hostEditor._codeMirror.getTokenAt(pos);
        
        // If the pos is at the beginning of a name, token will be the 
        // preceding whitespace or dot. In that case, try the next pos.
        if (token.string.trim().length === 0 || token.string === ".") {
            token = hostEditor._codeMirror.getTokenAt({line: pos.line, ch: pos.ch + 1});
        }
        
        if (token.className === "string") {
            var string = token.string;
            
            // Strip quotes
            var char = string[0];
            if (char === "\"" || char === "'") {
                string = string.substr(1);
            }
            char = string[string.length - 1];
            if (char === "\"" || char === "'") {
                string = string.substr(0, string.length - 1);
            }
            
            return string;
        } else {
            
            // Check for url(...);
            var line = hostEditor._codeMirror.getLine(pos.line);
            var match = /url\s*\(([^)]*)\)/.exec(line);
            
            if (match && match[1]) {
                // URLs are relative to the doc
                var docPath = hostEditor.document.file.fullPath;
                
                docPath = docPath.substr(0, docPath.lastIndexOf("/"));
                
                return docPath + "/" + match[1];
            }
        }
        
        return "";
    }
    
    /**
     * This function is registered with EditManager as an inline editor provider. It creates an inline editor
     * when cursor is on a JavaScript function name, find all functions that match the name
     * and show (one/all of them) in an inline editor.
     *
     * @param {!Editor} editor
     * @param {!{line:Number, ch:Number}} pos
     * @return {$.Promise} a promise that will be resolved with an InlineWidget
     *      or null if we're not going to provide anything.
     */
    function inlineImageViewerProvider(hostEditor, pos) {
        
        // Only provide image viewer if the selection is within a single line
        var sel = hostEditor.getSelection(false);
        if (sel.start.line !== sel.end.line) {
            return null;
        }
        
        // Always use the selection start for determining the image file name. The pos
        // parameter is usually the selection end.        
        var fileName = _getStringAtPos(hostEditor, hostEditor.getSelection(false).start);
        if (fileName === "") {
            return null;
        }
        
        // Check for valid file extensions
        if (!/(.png|.jpg|.jpeg|.gif|.svg)$/i.test(fileName)) {
            return null;
        }

        // TODO: Check for relative path
        var projectPath = ProjectManager.getProjectRoot().fullPath;
        
        if (fileName.indexOf(projectPath) !== 0) {
            fileName = projectPath + fileName;
        }
        var result = new $.Deferred();

        var imageViewer = new InlineImageViewer(fileName.substr(fileName.lastIndexOf("/")), fileName);
        imageViewer.load(hostEditor);
        
        result.resolve(imageViewer);
        
        return result.promise();
    }

    EditorManager.registerInlineEditProvider(inlineImageViewerProvider);
}
function javaScriptFunctionProvider(hostEditor, pos) {
        // Only provide a JavaScript editor when cursor is in JavaScript content
        if (hostEditor.getModeForSelection() !== "javascript") {
            return null;
        }
        
        // Only provide JavaScript editor if the selection is within a single line
        var sel = hostEditor.getSelection(false);
        if (sel.start.line !== sel.end.line) {
            return null;
        }
        
        // Always use the selection start for determining the function name. The pos
        // parameter is usually the selection end.        
        var functionName = _getFunctionName(hostEditor, hostEditor.getSelection(false).start);
        if (functionName === "") {
            return null;
        }

        var result = new $.Deferred();

        FileIndexManager.getFileInfoList("all")
            .done(function (fileInfos) {
                
                JSUtils.findMatchingFunctions(functionName, fileInfos)
                    .done(function (functions) {
                        if (functions && functions.length > 0) {
                            var jsInlineEditor = new MultiRangeInlineEditor(functions);
                            jsInlineEditor.load(hostEditor);
                            
                            result.resolve(jsInlineEditor);
                        } else {
                            // No matching functions were found
                            result.reject();
                        }
                    })
                    .fail(function () {
                        result.reject();
                    });
            })
            .fail(function () {
                result.reject();
            });
        
        return result.promise();
    }
function openAndSelectDocument(fullPath, fileSelectionFocus) {
        var result;

        if (fileSelectionFocus !== PROJECT_MANAGER && fileSelectionFocus !== WORKING_SET_VIEW) {
            throw new Error("Bad parameter passed to FileViewController.openAndSelectDocument");
        }

        // Opening files are asynchronous and we want to know when this function caused a file
        // to open so that _fileSelectionFocus is set appropriatly. _curDocChangedDueToMe is set here
        // and checked in the cyrrentDocumentChange handler
        _curDocChangedDueToMe = true;

        _fileSelectionFocus = fileSelectionFocus;

        // If fullPath corresonds to the current doc being viewed then opening the file won't
        // trigger a currentDocumentChanged event, so we need to trigger a documentSelectionFocusChange 
        // in this case to signify the selection focus has changed even though the current document has not.
        var curDoc = DocumentManager.getCurrentDocument();
        if (curDoc && curDoc.file.fullPath === fullPath) {
            $(exports).triggerHandler("documentSelectionFocusChange");
            // Ensure the editor has focus even though we didn't open a new file.
            EditorManager.focusEditor();
            result = (new $.Deferred()).resolve().promise();
        } else {
            result = CommandManager.execute(Commands.FILE_OPEN, {fullPath: fullPath});
        }
        
        // clear after notification is done
        result.always(function () {
            _curDocChangedDueToMe = false;
        });
        
        return result;
    }
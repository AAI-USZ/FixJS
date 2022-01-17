function addToWorkingSetAndSelect(fullPath, selectIn) {
        var result = new $.Deferred(),
            promise = CommandManager.execute(Commands.FILE_ADD_TO_WORKING_SET, {fullPath: fullPath});

        // This properly handles sending the right nofications in cases where the document
        // is already the current one. In that case we will want to notify with
        // documentSelectionFocusChange so the views change their selection
        promise.done(function (doc) {
            // FILE_ADD_TO_WORKING_SET command sets the current document. Update the 
            // selection focus and trigger documentSelectionFocusChange event
            _fileSelectionFocus = selectIn ? selectIn : WORKING_SET_VIEW;
            _selectCurrentDocument();
            
            result.resolve(doc);
        }).fail(function (err) {
            result.reject(err);
        });

        return result.promise();
    }
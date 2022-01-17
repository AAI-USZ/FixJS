function (doc) {
            // FILE_ADD_TO_WORKING_SET command sets the current document. Update the 
            // selection focus and trigger documentSelectionFocusChange event
            _fileSelectionFocus = WORKING_SET_VIEW;
            _selectCurrentDocument();
            
            result.resolve(doc);
        }
function setFileViewFocus(fileSelectionFocus) {
        if (fileSelectionFocus !== PROJECT_MANAGER && fileSelectionFocus !== WORKING_SET_VIEW) {
            throw new Error("Bad parameter passed to FileViewController.setFileViewFocus");
        }

        _fileSelectionFocus = fileSelectionFocus;
        $(exports).triggerHandler("fileViewFocusChange");
    }
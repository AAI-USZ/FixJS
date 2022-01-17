function setFileSelectionFocus(fileSelectionFocus) {
        if (fileSelectionFocus !== PROJECT_MANAGER && fileSelectionFocus !== WORKING_SET_VIEW) {
            throw new Error("Bad parameter passed to FileViewController.openAndSelectDocument");
        }

        _fileSelectionFocus = fileSelectionFocus;
        $(exports).triggerHandler("documentSelectionFocusChange");
    }
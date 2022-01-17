function addToWorkingSetAndSelect(fullPath) {
        CommandManager.execute(Commands.FILE_ADD_TO_WORKING_SET, {fullPath: fullPath});

        // This properly handles sending the right nofications in cases where the document
        // is already the curruent one. In that case we will want to notify with
        // documentSelectionFocusChange so the views change their selection
        return openAndSelectDocument(fullPath, WORKING_SET_VIEW);
    }
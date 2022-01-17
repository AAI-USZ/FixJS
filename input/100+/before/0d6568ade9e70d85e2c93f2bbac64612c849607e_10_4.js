function () {
                // Pop up a folder browse dialog
                NativeFileSystem.showOpenDialog(false, true, "Choose a folder", _projectRoot.fullPath, null,
                    function (files) {
                        // If length == 0, user canceled the dialog; length should never be > 1
                        if (files.length > 0) {
                            $(exports).triggerHandler("beforeProjectClose", _projectRoot);

                            // Actually close all the old files now that we know for sure we're proceeding
                            DocumentManager.closeAll();
                            
                            // Load the new project into the folder tree
                            loadProject(files[0]);
                        }
                    },
                    function (error) {
                        Dialogs.showModalDialog(
                            Dialogs.DIALOG_ID_ERROR,
                            Strings.ERROR_LOADING_PROJECT,
                            StringUtils.format(Strings.OPEN_DIALOG_ERROR, error.code)
                        );
                    }
                    );
            }
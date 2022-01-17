function openProject(path) {

        var result = new $.Deferred();

        // Confirm any unsaved changes first. We run the command in "prompt-only" mode, meaning it won't
        // actually close any documents even on success; we'll do that manually after the user also oks
        //the folder-browse dialog.
        CommandManager.execute(Commands.FILE_CLOSE_ALL, { promptOnly: true })
            .done(function () {
                if (path) {
                    // use specified path
                    _loadProject(path).pipe(result.resolve, result.reject);
                } else {
                    // Pop up a folder browse dialog
                    NativeFileSystem.showOpenDialog(false, true, "Choose a folder", _projectRoot.fullPath, null,
                        function (files) {
                            // If length == 0, user canceled the dialog; length should never be > 1
                            if (files.length > 0) {
                                // Load the new project into the folder tree
                                _loadProject(files[0]).pipe(result.resolve, result.reject);
                            } else {
                                result.reject();
                            }
                        },
                        function (error) {
                            Dialogs.showModalDialog(
                                Dialogs.DIALOG_ID_ERROR,
                                Strings.ERROR_LOADING_PROJECT,
                                StringUtils.format(Strings.OPEN_DIALOG_ERROR, error.code)
                            );
                            result.reject();
                        }
                        );
                }
            })
            .fail(function () {
                result.reject();
            });

        // if fail, don't open new project: user canceled (or we failed to save its unsaved changes)
        return result.promise();
    }
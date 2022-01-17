function () {
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
            }
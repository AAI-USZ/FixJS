function loadProject(rootPath) {
        // reset tree node id's
        _projectInitialLoad.id = 0;

        var prefs = _prefs.getAllValues(),
            result = new $.Deferred(),
            resultRenderTree;

        if (rootPath === null || rootPath === undefined) {
            // Load the last known project into the tree
            rootPath = prefs.projectPath;

            _projectInitialLoad.previous = prefs.projectTreeState;

            if (brackets.inBrowser) {
                // In browser: dummy folder tree (hardcoded in ProjectManager)
                rootPath = "DummyProject";
                $("#project-title").html(rootPath);
            }
        }
        
        // Populate file tree as long as we aren't running in the browser
        if (!brackets.inBrowser) {
            // Point at a real folder structure on local disk
            NativeFileSystem.requestNativeFileSystem(rootPath,
                function (rootEntry) {
                    var projectRootChanged = (!_projectRoot || !rootEntry)
                        || _projectRoot.fullPath !== rootEntry.fullPath;

                    // Success!
                    var perfTimerName = PerfUtils.markStart("Load Project: " + rootPath);

                    _projectRoot = rootEntry;

                    // The tree will invoke our "data provider" function to populate the top-level items, then
                    // go idle until a node is expanded - at which time it'll call us again to fetch the node's
                    // immediate children, and so on.
                    resultRenderTree = _renderTree(_treeDataProvider);

                    resultRenderTree.done(function () {
                        if (projectRootChanged) {
                            $(exports).triggerHandler("projectOpen", _projectRoot);
                        }
                        
                        result.resolve();
                    });
                    resultRenderTree.fail(function () {
                        PerfUtils.terminateMeasurement(perfTimerName);
                        result.reject();
                    });
                    resultRenderTree.always(function () {
                        PerfUtils.addMeasurement(perfTimerName);
                    });
                },
                function (error) {
                    Dialogs.showModalDialog(
                        Dialogs.DIALOG_ID_ERROR,
                        Strings.ERROR_LOADING_PROJECT,
                        StringUtils.format(
                            Strings.REQUEST_NATIVE_FILE_SYSTEM_ERROR,
                            StringUtils.htmlEscape(rootPath),
                            error.code,
                            function () {
                                result.reject();
                            }
                        )
                    ).done(function () {
                        // The project folder stored in preference doesn't exist, so load the default 
                        // project directory.
                        // TODO (issue #267): When Brackets supports having no project directory
                        // defined this code will need to change
                        return loadProject(_getDefaultProjectPath());
                    });
                }
                );
        }

        return result.promise();
    }
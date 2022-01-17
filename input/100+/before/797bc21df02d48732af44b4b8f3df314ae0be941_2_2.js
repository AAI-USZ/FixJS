function (files) {
                        // If length == 0, user canceled the dialog; length should never be > 1
                        if (files.length > 0) {
                            $(exports).triggerHandler("beforeProjectClose", _projectRoot);

                            // Actually close all the old files now that we know for sure we're proceeding
                            DocumentManager.closeAll();
                            
                            // Load the new project into the folder tree
                            loadProject(files[0]);
                        }
                    }
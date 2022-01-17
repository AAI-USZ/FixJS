function () {
                        if (isFirstProjectOpen) {
                            $(exports).triggerHandler("initializeComplete", _projectRoot);
                        }

                        if (projectRootChanged) {
                            $(exports).triggerHandler("projectRootChanged", _projectRoot);
                        }
                        
                        result.resolve();
                    }
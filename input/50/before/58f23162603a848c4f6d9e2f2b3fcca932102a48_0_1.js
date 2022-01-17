function() {
                        this.setSubmitInProgress(false);
                        phpr.pageManager.modifyCurrentState(
                            { moduleName: "Module", id: undefined },
                            { forceModuleReload: true }
                        );
                    }
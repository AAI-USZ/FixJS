function() {
                        this.setSubmitInProgress(false);
                        this.main.setGlobalModulesNavigation();
                        phpr.pageManager.modifyCurrentState(
                            { moduleName: "Module", id: undefined },
                            { forceModuleReload: true }
                        );
                    }
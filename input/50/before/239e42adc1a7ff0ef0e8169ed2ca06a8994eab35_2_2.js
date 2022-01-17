function() {
                    this.main.setGlobalModulesNavigation();
                    this.publish("setUrlHash", [phpr.parentmodule, null, [phpr.module]]);
                }
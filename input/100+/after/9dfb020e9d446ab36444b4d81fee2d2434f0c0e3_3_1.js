function() {
                        require(['../Workbench'], function(workbench) {
                            workbench.getOpenEditor().save();
                        });
                    }
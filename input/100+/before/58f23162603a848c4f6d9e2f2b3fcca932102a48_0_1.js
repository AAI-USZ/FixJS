function(data) {
            if (data) {
                new phpr.handleResponse('serverFeedback', data);
                if (data.type == 'success') {
                    if (!this.id) {
                        phpr.loadJsFile(phpr.webpath + 'index.php/js/module/name/' + this.sendData.name +
                            '/csrfToken/' + phpr.csrfToken);
                    }
                    this.publish("updateCacheData");
                    phpr.DataStore.deleteData({url: phpr.globalModuleUrl});
                    phpr.DataStore.addStore({url: phpr.globalModuleUrl});
                    phpr.DataStore.requestData({
                        url:         phpr.globalModuleUrl
                    }).then(dojo.hitch(this, function() {
                        this.setSubmitInProgress(false);
                        phpr.pageManager.modifyCurrentState(
                            { moduleName: "Module", id: undefined },
                            { forceModuleReload: true }
                        );
                    }));
                } else {
                    this.setSubmitInProgress(false);
                }
            }
        }
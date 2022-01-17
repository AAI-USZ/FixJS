function() {
        if (!this.prepareSubmission()) {
            return false;
        }

        this.setSubmitInProgress(true);
        phpr.send({
            url: phpr.webpath + 'index.php/' + phpr.module + '/index/jsonSave/nodeId/' + phpr.currentProjectId +
                '/id/' + this.id,
            content:   this.sendData
        }).then(dojo.hitch(this, function(data) {
            this.setSubmitInProgress(false);
            if (data) {
                new phpr.handleResponse('serverFeedback', data);
                if (!this.id) {
                    this.id = data.id;
                }
                if (data.type == 'success') {
                    this.publish("updateCacheData");
                    this.publish("setUrlHash", [phpr.module]);
                }
            }
        }));
    }
function(data) {
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
        }
function(data) {
            if (data) {
                new phpr.handleResponse('serverFeedback', data);
                if (data.type == 'success') {
                    return phpr.send({
                        url: phpr.webpath + 'index.php/Core/module/jsonSave/nodeId/1/id/' + this.id,
                        content:   this.sendData
                    });
                } else {
                    this.setSubmitInProgress(false);
                }
            }
        }
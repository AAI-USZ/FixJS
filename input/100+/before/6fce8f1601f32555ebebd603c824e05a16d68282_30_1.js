function processResponse(response) {
            try {
                this.buildNumber = response.number;
                if (this.state !== 'Failed' && response.state === 'Failed') {
                    this.state = 'Failed';
                    this.buildFailed.dispatch(this);
                }
                if (this.state === 'Failed' && response.state === 'Successful') {
                    this.state = 'Successful';
                    this.buildFixed.dispatch(this);
                }
                updateFinished.dispatch(true, response);
            } catch (e) {
                this.errorThrown.dispatch(e);
                updateFinished.dispatch(false, e);
            }
        }
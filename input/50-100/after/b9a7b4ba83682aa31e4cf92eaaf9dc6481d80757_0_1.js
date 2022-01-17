function abort() {
            this.aborted = true;
            this.responseText = null;
            this.errorFlag = true;
            this.requestHeaders = {};

            if (this.readyState < sinon.FakeXMLHttpRequest.DONE &&
                this.readyState > sinon.FakeXMLHttpRequest.UNSENT && this.sendFlag) {
                this.readyStateChange(sinon.FakeXMLHttpRequest.DONE);
                this.sendFlag = false;
            }

            this.readyState = sinon.FakeXMLHttpRequest.UNSENT;
        }
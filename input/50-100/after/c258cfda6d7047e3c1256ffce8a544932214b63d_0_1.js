function(aRequest, aContext, aStatusCode) {
        this.originalListener.onStopRequest(aRequest, aContext, aStatusCode);
        if (this.DOMWindow !== null && this.DOMWindow !== undefined) {
            try {
                let info = getRequestInfo(aRequest, this);
                RequestCache.pushData(this.DOMWindow, info);
            } catch(e) {
                console.exception(e);
            } finally {
                this.receivedData = null;
            }
        }
    }
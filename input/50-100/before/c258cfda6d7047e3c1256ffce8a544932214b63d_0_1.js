function(aRequest, aContext, aStatusCode) {
        this.originalListener.onStopRequest(aRequest, aContext, aStatusCode);

        try {
            let info = getRequestInfo(aRequest, this);
            RequestCache.pushData(this.DOMWindow, info);
        } catch(e) {
            console.exception(e);
        } finally {
            this.receivedData = null;
        }
    }
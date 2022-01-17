function (rpcRequest, deferred) {
        var successCallbackId = rpcRequest.success ? this.addAjaxCallback(rpcRequest.success) : this.defaultSuccessEvent;
        var errorCallbackId = rpcRequest.error ? this.addAjaxCallback(rpcRequest.error) : this.defaultErrorEvent;

        var key = successCallbackId + ':' + errorCallbackId + ':' + this.connectionNumber;
        
        if(deferred) {
            this._ajaxDeferred[key] = deferred;
        }
        
        return key;
    }
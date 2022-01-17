function (rpcRequest, deferred) {
        var me = this;
        var defaultSuccess = function (data) {
            OpenAjax.hub.publish(me.defaultSuccessEvent, data);
        };
        var defaultError = function (data) {
            OpenAjax.hub.publish(me.defaultErrorEvent, data);
        };
        var successCallbackId = rpcRequest.success ? this.addAjaxCallback(rpcRequest.success) : this.addAjaxCallback(defaultSuccess);
        var errorCallbackId = rpcRequest.error ? this.addAjaxCallback(rpcRequest.error) : this.addAjaxCallback(defaultError);

        var key = successCallbackId + ':' + errorCallbackId + ':' + this.connectionNumber;

        if(deferred) {
            this._ajaxDeferred[key] = deferred;
        }

        return key;
    }
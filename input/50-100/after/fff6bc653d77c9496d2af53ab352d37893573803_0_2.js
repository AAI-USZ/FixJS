function () {
        this.connected = true;

        if(this._ajaxQueue) {
            // Retry, if calls were made while disconnected
            while(this._ajaxQueue.length > 0) {
                this.rpc(this._ajaxQueue.shift());
            }
        }

        this.triggerEvent('onConnected', arguments);
    }
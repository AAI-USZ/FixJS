function (data) { // Error ajax response handler for sendInitRequest()
        this.log('ERROR: Could not get initialization data from Liquid Ajax Server');
        
        this.triggerEvent('onInitError', arguments);
    }
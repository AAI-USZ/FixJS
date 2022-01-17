function (data) { // Success ajax response handler for sendInitRequest()
        this._initRequestSubmitting = false;
        if(data.version != this.version) {
            this.log('WARNING: Liquid Ajax Server version (' + data.version
                + ') is different from client version (' + this.version
                + ').');
        }

        this.setDebugMode(data.debugMode);
        this.setDevelopmentMode(data.developmentMode);

        this.setConfig(data.config);
        this.setSecret(data.secret);

        this.setConnectionHash(data.connectionHash);
        this.setConnectionNumber(data.connectionNumber);

        this.log('Initialization successful');

        this.triggerEvent('onInitSuccess', arguments);

        this.afterInitSuccess();
    }
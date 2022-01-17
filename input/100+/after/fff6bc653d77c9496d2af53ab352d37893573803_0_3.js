function () { // Get initial configuration and channel data from the server
        if (!this._initRequestSubmitting) {
            this._initRequestSubmitting = true;
            var url = this.rpcUrl + '/init';

            var data = { version: this.version, time: new Date().getTime() };

            $.ajax({
                type: 'GET',
                data: data,
                url: url,
                success: this.callback('onInitSuccess'),
                error: this.callback('onInitError'),
                dataType: 'json',
                fixture: this.useFixtures ? steal.root.path + '/fixtures/rpc/init.json' : false
            });

            this.triggerEvent('sendInitRequest', [data, url]);
        }
    }
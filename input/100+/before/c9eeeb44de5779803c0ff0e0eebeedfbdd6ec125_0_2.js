function () {
        this._pubsubClient = this._pubsubServer.createClient();
        this._pubsubClient.on(
            "slave:" + this._id + ":session:loaded",
            this._onSessionLoaded.bind(this)
        );
        this._pubsubClient.on(
            "slave:" + this._id + ":session:unloaded",
            this._onSessionUnloaded.bind(this)
        );

        var self = this

        this._pubsubClient.on(
            "slave:" + this._id + ":imprisoned",
            function() {
                console.log('i was imprisoned')
                self._onImprisoned.bind(self)
            }

        );

        this._pubsubServer.on("client:disconnect", this._clientDisconnectListener);
    }
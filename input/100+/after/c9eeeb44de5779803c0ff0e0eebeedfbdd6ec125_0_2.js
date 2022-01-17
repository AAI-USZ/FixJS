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

        this._pubsubClient.on(
            "slave:" + this._id + ":imprisoned",
			this._onImprisoned.bind(this)
        );

        this._pubsubServer.on("client:disconnect", this._clientDisconnectListener);
    }
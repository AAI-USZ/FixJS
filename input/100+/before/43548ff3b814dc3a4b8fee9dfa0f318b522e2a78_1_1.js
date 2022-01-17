function cGR_commit(aSession) {

        try {
            // Set the session to request with
            if (aSession) {
                this.mSession = aSession;
            }

            // create the channel
            var ioService = cal.getIOService();

            var uristring = this.uri;
            if (this.mQueryParameters.length > 0) {
                uristring += "?" + this.mQueryParameters.join("&");
            }
            var uri = ioService.newURI(uristring, null, null);
            var channel = ioService.newChannelFromURI(uri);

            this.prepareChannel(channel);

            channel = channel.QueryInterface(Components.interfaces.nsIHttpChannel);
            channel.redirectionLimit = 3;

            this.mLoader = cal.createStreamLoader();

            cal.LOG("[calGoogleCalendar] Requesting " + this.method + " " +
                    channel.URI.spec);

            channel.notificationCallbacks = this;

            cal.sendHttpRequest(this.mLoader, channel, this);
        } catch (e) {
            // Let the response function handle the error that happens here
            this.fail(e.result, e.message);
        }
    }
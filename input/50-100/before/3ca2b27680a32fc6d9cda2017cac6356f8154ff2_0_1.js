function(message) {
        if (message.data === "</stream:stream>") {
            this.disconnect();
            return;
        }
        var string = message.data.replace(/^<stream:([a-z]*)>/, "<stream:$1 xmlns:stream='http://etherx.jabber.org/streams'>");

        parser = new DOMParser();
        var elem = parser.parseFromString(string, "text/xml").documentElement;

        var elem = this._c._bodyWrap(elem).tree();

        this._c._dataRecv(elem);
    }
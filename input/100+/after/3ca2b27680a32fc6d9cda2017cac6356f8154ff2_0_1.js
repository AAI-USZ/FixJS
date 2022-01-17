function(message) {
        var string = message.data.replace(/^<stream:([a-z]*)>/, "<stream:$1 xmlns:stream='http://etherx.jabber.org/streams'>");;
        string = string.replace(/^<stream:stream (.*[^/])>/, "<stream:stream $1/>");

        var parser = new DOMParser();
        var elem = parser.parseFromString(string, "text/xml").documentElement;

        if (elem.nodeName != "stream:stream") {
            this.socket.onmessage = this._onMessage.bind(this);
            elem = this._c._bodyWrap(elem).tree();
            this._c._connect_cb(elem);
        } else {
            this._c.xmlInput(elem);
            this._c.rawInput(Strophe.serialize(elem));
        }
    }
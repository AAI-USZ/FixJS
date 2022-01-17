function(message) {
        if (message.data === "</stream:stream>") {
            var close = "</stream:stream>";
            this._c.rawInput(close);
            this._c.xmlInput(this._c._bodyWrap(document.createElement("stream:stream")));
            if (!this._c.disconnecting) {
                this._c._doDisconnect();
            }
            return;
        }
        var string = message.data.replace(/^<stream:([a-z]*)>/, "<stream:$1 xmlns:stream='http://etherx.jabber.org/streams'>");
        string = string.replace(/^<stream:stream (.*[^/])>/, "<stream:stream $1/>");

        parser = new DOMParser();
        var elem = parser.parseFromString(string, "text/xml").documentElement;

        var elem = this._c._bodyWrap(elem).tree();

        if (this._check_streamerror(elem, Strophe.Status.ERROR)) {
            return;
        }

        if (this._c.disconnecting &&
                elem.firstChild.nodeName === "presence" &&
                elem.firstChild.getAttribute("type") === "unavailable") {
            this._c.xmlInput(elem);
            this._c.rawInput(Strophe.serialize(elem));
            // if we are already disconnecting we will ignore the unavailable stanza and
            // wait for the </stream:stream> tag before we close the connection
            return;
        } else {
            this._c._dataRecv(elem);
        }
    }